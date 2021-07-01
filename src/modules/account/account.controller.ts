import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ROUTES } from '../../core/constants/consts';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { TopUpDto } from './dto/top-up.dto';
import { TransferDto } from './dto/transfer.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller(ROUTES.ACCOUNT_ROOT)
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.createAsync(createAccountDto);
  }

  @Get(ROUTES.ACCOUNT_GET_ALL)
  async findAll(@Param(ROUTES.PARAM_CUSTOMER_ID) customerId: string) {
    return await this.accountService.findCustomerAccountsAsync(customerId);
  }

  @Get(ROUTES.ACCOUNT_GET_DETAIL)
  async findOne(@Param(ROUTES.PARAM_ID) id: string) {
    return await this.accountService.findOneAsync(id);
  }

  @Patch(ROUTES.ACCOUNT_PATCH)
  async update(@Param(ROUTES.PARAM_ID) id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return await this.accountService.updateAsync(id, updateAccountDto);
  }

  @Delete(ROUTES.ACCOUNT_DELETE)
  async remove(@Param(ROUTES.PARAM_ID) id: string) {
    return await this.accountService.removeAsync(id);
  }

  @Get(ROUTES.ACCOUNT_GET_TRANSACTIONS)
  async getTransactions(@Param(ROUTES.PARAM_ID) id: string) {
    return await this.accountService.findAllTransactions(id);
  }

  @Get(ROUTES.ACCOUNT_GET_BALANCE)
  async getAccountBalance(@Param(ROUTES.PARAM_ID) id: string) {
    return await this.accountService.getBalanceAsync(id);
  }

  @Post(ROUTES.ACCOUNT_POST_TOP_UP)
  async topUpMoney(@Body() topUpDto: TopUpDto) {
    return await this.accountService.topUpAsync(topUpDto);
  }

  @Post(ROUTES.ACCOUNT_POST_TRANSFER)
  async transferMoney(@Body() transferDto: TransferDto) {
    return await this.accountService.transferMoney(transferDto);
  }
}
