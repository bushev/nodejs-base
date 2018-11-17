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

    describe('Test signup action', () => {

        it('should reject an ValidationError', () => {

            broker.call('user.signup', {}).should.be.rejectedWith(ValidationError);
        });
    });
});
