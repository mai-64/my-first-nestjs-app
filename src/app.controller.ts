import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAiReply')
  async getAiReply(): Promise<string> {
    try {
      let aiReply = await this.appService.getAiReply();
      if (aiReply) {
        return aiReply;
      }
    } catch (error) {
      console.error(`Exception. error is: ${error.message}`);
      return `Exception.`;
    }

    return `Bed Request.`;
  }
}
