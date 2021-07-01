import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { handleHttpException } from '../../core/helpers';
import { STRINGS } from '../../core/constants/consts';
import { CreateAccountDto } from './dto/create-account.dto';
import { TopUpDto } from './dto/top-up.dto';
import { TransferDto } from './dto/transfer.dto';
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
      this.handleError(err);
    }
  }

  async findCustomerAccountsAsync(customerId: string): Promise<Array<AccountEntity>> {
    try {
      const accounts = await this.accountRepo.findAllAsync(customerId);
      if (!accounts || accounts.length === 0) {
        throw new HttpException(STRINGS.ERR_ACCOUNT_SERVICE_NO_ACCOUNTS, HttpStatus.NO_CONTENT);
      }
      return accounts;
    } catch (err) {
      this.handleError(err);
    }
  }

  async findOneAsync(id: string) {
    try {
      const account = await this.accountRepo.findOneAsync(id);
      if (!account) {
        throw new NotFoundException(STRINGS.ERR_ACCOUNT_SERVICE_NOT_FOUND);
      }
      return account;
    } catch (err) {
      this.handleError(err);
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
      this.handleError(err);
    }
  }

  async removeAsync(id: string) {
    try {
      await this.accountRepo.removeAsync(id);
    } catch (err) {
      this.handleError(err);
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
      this.handleError(err);
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
      this.handleError(err);
    }
  }

  async transferMoney(transferDto: TransferDto) {
    try {
      const { amount, fromAccountId, toAccountId } = transferDto;
      this.validateTransfer(amount);
      const transferKey = `${fromAccountId}>>>${toAccountId}`;
      const fromTopUpDto: TopUpDto = {
        accountId: fromAccountId,
        amount: -amount,
        transferKey
      };
      const toTopUpDto: TopUpDto = {
        accountId: toAccountId,
        amount: amount,
        transferKey
      };

      await this.topUpAsync(fromTopUpDto);
      await this.topUpAsync(toTopUpDto);

    } catch (err) {
      this.handleError(err);
    }
  }

  async findAllTransactions(accountId: string): Promise<TransactionEntity[]> {
    try {
      const transactions = await this.transactionRepo.findAllAsync(accountId);
      if (!transactions) {
        return [];
      }
      return transactions;
    } catch (err) {
      this.handleError(err);
    }
  }

  private readonly handleError =
    (err) => { handleHttpException(err); };

  private validateBalance(balance: number) {
    if (!balance || balance < 0) {
      throw new HttpException(STRINGS.ERR_ACCOUNT_SERVICE_GET_BALANCE_FAILED, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  private validateTopUp(amount: number, currentBalance: number) {

    if (amount === 0) {
      this.handleError(STRINGS.ERR_ACCOUNT_SERVICE_ZERO_AMOUNT);
    } else if (currentBalance <= 0 && amount < 0) {
      this.handleError(STRINGS.ERR_ACCOUNT_SERVICE_INSUFFICIENT_BALANCE);
    } else if ((currentBalance + amount) < 0) {
      this.handleError(STRINGS.ERR_ACCOUNT_SERVICE_INSUFFICIENT_BALANCE);
    }

  }

  private validateTransfer(amount: number) {
    if (amount <= 0) {
      this.handleError(STRINGS.ERR_ACCOUNT_SERVICE_AMOUNT_NOT_VALID);
    }
  }
}
