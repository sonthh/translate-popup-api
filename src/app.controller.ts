import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { FindWordDto } from './app.dto';
import { ValidationPipe } from './middlewares/pipes/validation.pipe';
import { checkControllerErrors } from './helpers/checkControllerError';

@Controller()
@ApiTags('translate word')
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  @UsePipes(new ValidationPipe())
  async getHello(
    @Query() query: FindWordDto
  ): Promise<any> {
    try {
      return await this.appService.getWord({
        query,
      });

    } catch (err) { 
      checkControllerErrors(err);
    }
  }

  @Get('/crawl')
  @UsePipes(new ValidationPipe())
  async crawler(): Promise<any> {
    try {
      return await this.appService.webCrawler();

    } catch (err) { 
      checkControllerErrors(err);
    }
  }
}
