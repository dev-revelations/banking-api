import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.createAsync(createAccountDto);
  }

  @Get('all/:customerId')
  findAll(@Param('customerId') customerId: string) {
    return this.accountService.findCustomerAccountsAsync(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOneAsync(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.updateAsync(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.removeAsync(id);
  }
}
