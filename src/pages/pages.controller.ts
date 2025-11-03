import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { PagesService } from './pages.service';
import { PagesGuard } from './guards/pages.guard';
import { Pages } from '../database/pg/page.entity';
import { AccessLevel } from '../decorators/accessLevel.decorator';
import { PagesDTO } from '../dto/pages.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('/all')
  @AccessLevel(true)
  @UseGuards(PagesGuard)
  async getFullStructure(@Req() req: Request): Promise<any> {
    return this.pageService.getFullStructure(req.user);
  }
  @Get('/page/:id')
  @AccessLevel(1)
  @UseGuards(PagesGuard)
  async getPageById(@Req() req: Request): Promise<Pages | null> {
    const id = parseInt(req.params?.id);
    console.log('params:', id);
    return await this.pageService.getPageById(id);
  }
  @Post('/page/create')
  @AccessLevel(2)
  @UseGuards(PagesGuard)
  async addPage(
    @Req() req: Request,
    @Body() pageValues: PagesDTO,
  ): Promise<Pages | null> {
    return await this.pageService.addPage(pageValues);
  }
  @Post('/page/:id')
  @AccessLevel(2)
  @UseGuards(PagesGuard)
  async updatePage(
    @Req() req: Request,
    @Body() pageValues: PagesDTO,
  ): Promise<any> {
    const id = parseInt(req.params?.id);
    return await this.pageService.updatePage(id, pageValues);
  }
  @Delete('/page/:id')
  @AccessLevel(2)
  @UseGuards(PagesGuard)
  async removePage(@Req() req: Request): Promise<any> {
    const id = parseInt(req.params?.id);
    return this.pageService.removePage(id);
  }
  @Get('/source')
  async returnSource(@Req() req: Request): Promise<any> {
    const link = decodeURIComponent(req.query?.path as string);
    console.log(link);
    return this.pageService.returnSource(link);
  }
}
