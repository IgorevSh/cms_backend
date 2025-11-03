import { Inject, Injectable } from '@nestjs/common';
import { Pages } from '../database/pg/page.entity';
import { UserDTO } from '../dto/user.dto';
import { PagesDTO } from '../dto/pages.dto';

@Injectable()
export class PagesService {
  constructor(@Inject('PAGES') private pagesModel: typeof Pages) {}

  async getFullStructure(user: { roles: { structure: any } }) {
    console.log('request');
    const structureRules: {
      [key: number]: number[];
    } = JSON.parse(user.roles.structure || '{}');
    const pagesList = await this.pagesModel.findAll();
    return pagesList.filter((itm) => {
      structureRules?.[itm?.id] > 0;
    });
  }

  async getPageById(id: number) {
    return await this.pagesModel.findOne({
      where: { id },
    });
  }

  async updatePage(id: number, values: PagesDTO) {
    return await this.pagesModel.update(values, {
      where: { id },
    });
  }

  async addPage(values: PagesDTO) {
    return await this.pagesModel.create(values);
  }

  async removePage(id: number) {
    return await this.pagesModel.destroy({ where: { id } });
  }
  async returnSource(link: string) {
    const source = await this.pagesModel.findOne({
      attributes: ['content'],
      where: { route: link },
      raw: true,
    });
    return source;
  }
}
