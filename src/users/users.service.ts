import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../database/pg/users.entity';
import { Op } from 'sequelize';
import { Roles } from '../database/pg/roles.entity';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class UsersService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;
  constructor(@Inject('USERS') private userModel: typeof Users) {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE || 'gmail', // или другой почтовый сервис
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
  async getUser(id) {
    return await this.userModel.findOne(id);
  }
  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({
      where: { mail: email },
      raw: true,
    });
  }
  async save2FACode(user: Users, code: string, expires: string): Promise<any> {
    await this.userModel.update(
      { twoFactorCode: code, twoFactorExpiresAt: expires },
      { where: { id: user?.id } },
    );
    await this.sendVerificationEmail(user?.mail, code);
    return { message: `Код отправлен на почту: ${user?.mail}` };
  }
  async delete2FACode(userId: number): Promise<any> {
    await this.userModel.update(
      { twoFactorCode: null, twoFactorExpiresAt: null },
      { where: { id: userId } },
    );
  }
  async getUsersList() {
    return await this.userModel.findAll();
  }
  async findByMailOrPhone(login: string) {
    return this.userModel.findOne({
      where: {
        [Op.or]: [{ mail: login }, { phone: login }],
      },
      raw: true,
      include: [Roles],
    });
  }
  async changeUserInfo(id: string, values: Users) {
    return await this.userModel.update(values, {
      where: { id },
    });
  }
  async removeUser(id: string) {
    return await this.userModel.destroy({
      where: { id },
    });
  }
  async addUser(values: Users) {
    return await this.userModel.create(values);
  }
  async sendVerificationEmail(to: string, code: string): Promise<any> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ваш код</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                  color: #333;
                  padding: 20px;
              }
              .container {
                  background-color: #fff;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              .code {
                  font-size: 40px;
                  font-weight: bold;
                  color: #4CAF50;
              }
              .footer {
                  font-size: 14px;
                  color: #777;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Ваш 4-значный код для подтверждения</h2>
              <p>Используйте следующий код для подтверждения вашего запроса:</p>
              <div class="code">${code}</div>
              <p class="footer">Если вы не запрашивали этот код, просто проигнорируйте это письмо.</p>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject: 'Ваш 4-значный код',
      html: htmlContent,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
