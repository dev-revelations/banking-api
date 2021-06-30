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
  async findAll(@Param('customerId') customerId: string) {
    return await this.accountService.findCustomerAccountsAsync(customerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accountService.findOneAsync(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return await this.accountService.updateAsync(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accountService.removeAsync(id);
  }
}
