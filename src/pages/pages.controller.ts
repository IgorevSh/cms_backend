import { Controller, Get, Post, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('/all')
  async getFullStructure(): Promise<any> {
    return this.pageService.getFullStructure();
  }
  @Get('/page/:id')
  async getPageById(@Req() req: Request): Promise<any> {
    const id = parseInt(req.params?.id);
    console.log('params:', id);
    return await this.pageService.getPageById(id);
  }
  @Post('/page/create')
  async addPage(@Req() req: Request): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values: any = req.body;
    return await this.pageService.addPage(values);
  }
  @Post('/page/:id')
  async updatePage(@Req() req: Request): Promise<any> {
    const id = parseInt(req.params?.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = req.body?.values;
    return await this.pageService.updatePage(id, values);
  }
  @Delete('/page/:id')
  async removePage(@Req() req: Request): Promise<any> {
    const id = parseInt(req.params?.id);
    return this.pageService.removePage(id);
  }
  @Get('/source')
  async returnSource(@Req() req: Request): Promise<any> {
    const link = req.params?.link;
    return this.pageService.returnSource(link);
  }
}
