import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface TransactionEntity extends InMemoryDBEntity {
    accountId: string,
    amount: number,
    balance: number,
    createdAt: Date,
    transferKey: string
}