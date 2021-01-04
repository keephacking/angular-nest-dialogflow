import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DfRequestsController } from './controllers';
import { DfService, EmailService } from './services';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, DfRequestsController],
  providers: [AppService, DfService, EmailService],
})
export class AppModule {}
