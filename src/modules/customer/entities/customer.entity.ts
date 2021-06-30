import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface CustomerEntity extends InMemoryDBEntity {
    name: string;
}
