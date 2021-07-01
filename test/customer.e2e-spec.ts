import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { GLOBAL_PREFIX, ROUTES } from '../src/core/constants/consts';
import { CustomerModule } from '../src/modules/customer/customer.module';

describe('CustomerController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, CustomerModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it(`/${ROUTES.CUSTOMER_ROOT} (GET) Status 204 No Content`, () => {
        return request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}`)
            .expect(204);
    });

    it(`/${ROUTES.CUSTOMER_ROOT} (GET) Status 200`, async () => {

        const res = await request(app.getHttpServer())
            .get(`/seed`)
            .expect(200);

        return await request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}`)
            .expect(200);
    });

    it(`/${ROUTES.CUSTOMER_ROOT}/:id (GET) Status 200`, async () => {

        await request(app.getHttpServer())
            .get(`/seed`)
            .expect(200);

        const res = await request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}`)
            .expect(200);

        const customer = res.body[0];

        const retrievedCustomer = (await request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}/${customer.id}`)
            .expect(200))
            .body;

        expect(retrievedCustomer.name).toEqual(customer.name);

        return true;
    });

    it(`/${ROUTES.CUSTOMER_ROOT}/:id (GET) Status 404 Not Found`, () => {
        return request(app.getHttpServer())
            .get(`/${ROUTES.CUSTOMER_ROOT}/a-wrong-id`)
            .expect(404);
    });

});