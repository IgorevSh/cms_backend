import { Inject, Injectable } from '@nestjs/common';
import { Pages } from '../database/pg/page.entity';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGES') private pagesModel: typeof Pages) {}

  async getFullStructure() {
    console.log('request');
    return await this.pagesModel.findAll();
  }

  async getPageById(id: number) {
    return await this.pagesModel.findOne({
      where: { id },
    });
  }

  async updatePage(id: number, values: any) {
    return await this.pagesModel.update(values, {
      where: { id },
    });
  }

  async addPage(values: any) {
    return await this.pagesModel.create(values);
  }

  async removePage(id: number) {
    return await this.pagesModel.destroy({ where: { id } });
  }
  async returnSource(link: any) {
    const source = await this.pagesModel.findOne({
      attributes: ['content'],
      where: { route: link },
      raw: true,
    });
    return source;
  }
}
