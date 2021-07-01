import { Injectable } from '@nestjs/common';
import { AccountService } from './modules/account/account.service';
import { AccountEntity } from './modules/account/entities/account.entity';
import { CustomerService } from './modules/customer/customer.service';
import { CustomerEntity } from './modules/customer/entities/customer.entity';

@Injectable()
export class AppService {

  constructor(private readonly customerSvc: CustomerService, private readonly accountSvc: AccountService) { }

  async seed() {
    const customer: CustomerEntity = await this.customerSvc.createAsync({ name: 'Behzad' });
    const accountA: AccountEntity = await this.accountSvc.createAsync({ customerId: customer.id, name: 'Account A' });
    const accountB: AccountEntity = await this.accountSvc.createAsync({ customerId: customer.id, name: 'Account B' });
    await this.accountSvc.topUpAsync({accountId: accountA.id, amount: 250});
    await this.accountSvc.topUpAsync({accountId: accountB.id, amount: 250});
  }

}
