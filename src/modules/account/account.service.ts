import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { TopUpDto } from './dto/top-up.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { TransactionEntity } from './entities/transaction.entity';
import AccountRepository from './repositories/account.repository';
import TransactionRepository from './repositories/transaction.repository';

@Injectable()
export class AccountService {

  constructor(private readonly accountRepo: AccountRepository, private readonly transactionRepo: TransactionRepository) { }

  async createAsync(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    try {
      const { name, customerId } = createAccountDto;
      const account: AccountEntity = {
        id: undefined,
        name,
        customerId
      };
      return await this.accountRepo.createAsync(account);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findCustomerAccountsAsync(customerId: string): Promise<Array<AccountEntity>> {
    try {
      const accounts = await this.accountRepo.findAllAsync(customerId);
      if (!accounts || accounts.length === 0) {
        throw new HttpException('There are no accounts', HttpStatus.NO_CONTENT);
      }
      return accounts;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneAsync(id: string) {
    try {
      const account = await this.accountRepo.findOneAsync(id);
      if (!account) {
        throw new NotFoundException(`Account not found`);
      }
      return account;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAsync(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      const { name, customerId } = updateAccountDto;
      const account: AccountEntity = {
        id,
        name,
        customerId
      };
      await this.accountRepo.updateAsync(account);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async removeAsync(id: string) {
    try {
      await this.accountRepo.removeAsync(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async topUpAsync(topUpDto: TopUpDto): Promise<TransactionEntity> {
    try {
      const { accountId, amount, transferKey } = topUpDto;
      const currentBalance = await this.getBalanceAsync(accountId);

      this.validateTopUp(amount, currentBalance);

      const balance = currentBalance + amount;

      const transaction: TransactionEntity = {
        id: undefined,
        createdAt: new Date(),
        accountId,
        amount,
        balance,
        transferKey
      }

      return await this.transactionRepo.createAsync(transaction);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getBalanceAsync(accountId: string): Promise<number> {
    try {
      const zeroBalance = 0;
      const transactions = await this.transactionRepo.findAllAsync(accountId);
      if (!transactions || transactions.length === 0) {
        return zeroBalance;
      }
      const balance = transactions
        .map(te => te.amount)
        .reduce((acc, current) => acc + current);

      this.validateBalance(balance);

      return balance;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


  private validateBalance(balance: number) {
    if (!balance || balance < 0) {
      throw new HttpException('Processing the account balance has failed', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  private validateTopUp(amount: number, currentBalance: number) {
    const throwHttpException =
      (message) => { throw new HttpException(message, HttpStatus.BAD_REQUEST) };

    if (amount === 0) {
      throwHttpException('Transactions with zero amount is not allowed');
    } else if (currentBalance <= 0 && amount < 0) {
      throwHttpException('Insufficient account balance');
    } else if ((currentBalance + amount) < 0) {
      throwHttpException('Insufficient account balance');
    }

  }
}
