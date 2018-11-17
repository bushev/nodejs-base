'use strict';

require('should');

const TestService = require('../../index');

const ServiceBroker = require('moleculer').ServiceBroker;

function setup(settings, brokerSettings = {}) {

    const broker = new ServiceBroker(Object.assign({}, {nodeID: undefined, logger: true}, brokerSettings));

    broker.loadService(__dirname + '/../services/db.service');

    const service = broker.createService(TestService);

    return [broker, service];
}

describe('Test default settings', () => {

    let broker;
    let service;

    beforeAll(() => {
        [broker, service] = setup();
        return broker.start();
    });

    afterAll(() => broker.stop());

    it('Signup new user', async () => {

        const user = await broker.call('user.signup', {
            email: 'test@gmail.com',
            firstName: 'Yury',
            password: 'password string'
        });

        user.should.containDeep({
            email: 'test@gmail.com',
            firstName: 'Yury'
        });
    });
});
