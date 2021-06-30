import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface AccountEntity extends InMemoryDBEntity {
    customerId: string;
    name: string;
}
