import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [CoreModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
