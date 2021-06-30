import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    CoreModule,
    CustomerModule,
    InMemoryDBModule.forRoot({}),
    AccountModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
