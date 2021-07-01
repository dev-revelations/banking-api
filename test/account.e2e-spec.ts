import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { ROUTES } from '../src/core/constants/consts';
import { AccountModule } from '../src/modules/account/account.module';
import { TransferDto } from '../src/modules/account/dto/transfer.dto';
import { TopUpDto } from 'src/modules/account/dto/top-up.dto';

describe('AccountController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, AccountModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_POST_TRANSFER} (POST) Status 201`, async () => {

        await request(app.getHttpServer())
            .get(`/seed`)
            .expect(200);

        const res = await request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}`)
            .expect(200);

        const customer = res.body[0];

        const accounts = (await request(app.getHttpServer())
            .get(`/${ROUTES.ACCOUNT_ROOT}/${ROUTES.ACCOUNT_GET_ALL.replace(':customerId', customer.id)}`)
            .expect(200))
            .body;

        expect(accounts.length).toBeGreaterThan(0);

        const fromAccount = accounts[0];
        const toAccount = accounts[1];

        const transferDto: TransferDto = {
            fromAccountId: fromAccount.id,
            toAccountId: toAccount.id,
            amount: 100
        };

        await request(app.getHttpServer())
            .post(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_POST_TRANSFER}`)
            .send(transferDto)
            .expect(201);


        const balanceA = (await request(app.getHttpServer())
            .get(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_GET_BALANCE.replace(':id', fromAccount.id)}`)
            .expect(200))
            .text;

        expect(balanceA).toEqual('150');

        return true;
    });


    it(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_POST_TOP_UP} (POST) Status 201`, async () => {

        await request(app.getHttpServer())
            .get(`/seed`)
            .expect(200);

        const res = await request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}`)
            .expect(200);

        const customer = res.body[0];

        const accounts = (await request(app.getHttpServer())
            .get(`/${ROUTES.ACCOUNT_ROOT}/${ROUTES.ACCOUNT_GET_ALL.replace(':customerId', customer.id)}`)
            .expect(200))
            .body;

        expect(accounts.length).toBeGreaterThan(0);

        const accountA = accounts[0];
        
        const topUpDto: TopUpDto = {
            accountId: accountA.id,
            amount: 50,
        };

        await request(app.getHttpServer())
            .post(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_POST_TOP_UP}`)
            .send(topUpDto)
            .expect(201);


        const balanceA = (await request(app.getHttpServer())
            .get(`/${ROUTES.ACCOUNT_ROOT}${ROUTES.ACCOUNT_GET_BALANCE.replace(':id', accountA.id)}`)
            .expect(200))
            .text;

        expect(balanceA).toEqual('300');

        return true;
    });


});