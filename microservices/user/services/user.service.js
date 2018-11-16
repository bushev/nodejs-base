'use strict';

const mongoose = require('../../../models/base').mongoose;

module.exports = {

    name: 'user',

    settings: {},

    dependencies: [],

    actions: {

        signup: {
            params: {
                email: 'string',
                firstName: 'string',
                password: 'string'
            },
            async handler(ctx) {

                return (await this.model.insert(ctx.params)).toObject({getters: true});
            }
        }
    },

    events: {},

    methods: {},

    created() {

    },

    async started() {

        await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

        this.model = require('../models/user');

        this.logger.info(`MongoDB connected`);
    },

    async stopped() {

        await mongoose.connection.close();
    }
};
