import { Controller, Get, Logger, Req } from '@nestjs/common';
import { DfService } from '../../services';
import { Request } from 'express';

@Controller('api/df')
export class DfRequestsController {
  constructor(private dfService: DfService) {}

  @Get('query/:text')
  async query(@Req() request: Request) {
    const headers = request.headers;

    Logger.debug(headers);

    return await this.dfService.runQuery(
      request.params['text'],
      headers['authorization'],
    );
  }
}
