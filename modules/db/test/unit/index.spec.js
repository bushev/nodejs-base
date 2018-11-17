'use strict';

require('should');

const ServiceBroker   = require('moleculer').ServiceBroker;
const ValidationError = require('moleculer').Errors.ValidationError;

const TestService = require('../../src/index');

describe('Test service', () => {
    const broker = new ServiceBroker();
    broker.createService(TestService);

    beforeAll(async () => {

        await broker.start();
    });

    afterAll(async () => {

        await broker.stop();
    });

    describe('Test database actions', () => {

        it('insert new item', async () => {

            const item = await broker.call('db.insert', {
                fieldName: 'fieldValue'
            });

            item.should.containDeep({
                fieldName: 'fieldValue'
            });
        });
    });
});
