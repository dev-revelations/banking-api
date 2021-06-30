import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import AccountRepository from './repositories/account.repository';
import TransactionRepository from './repositories/transaction.repository';

@Module({
  imports: [
    InMemoryDBModule.forFeature('account')
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, TransactionRepository],
  exports: [AccountService, AccountRepository, TransactionRepository]
})
export class AccountModule { }
