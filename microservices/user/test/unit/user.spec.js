'use strict';

require('should');

const ServiceBroker   = require('moleculer').ServiceBroker;
const ValidationError = require('moleculer').Errors.ValidationError;

const TestService = require('../../services/user.service');

process.env.MONGODB_URL = `mongodb://127.0.0.1:27017/nodejs-lib-2`;

const model = require('../../models/user');

describe('Test service', () => {
    const broker = new ServiceBroker();
    broker.createService(TestService);

    beforeAll(async () => {

        await broker.start();

        await model.remove({});
    });

    afterAll(async () => {

        await broker.stop();
    });

    describe('Test signup action', () => {

        it('User should be created', async () => {

            const user = await broker.call('user.signup', {
                email: 'test@gmail.com',
                firstName: 'Yury',
                password: 'password string'
            });

            Object.keys(user).sort().should.deepEqual(['__v', '_id', 'createdAt', 'email', 'firstName', 'id', 'password']);

            user.should.containDeep({
                email: 'test@gmail.com',
                firstName: 'Yury'
            });
        });

        it('should reject an ValidationError', () => {

            broker.call('user.signup', {}).should.be.rejectedWith(ValidationError);
        });
    });
});

