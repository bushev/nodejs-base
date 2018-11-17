'use strict';

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

                return await ctx.call('db.insert', ctx.params);
            }
        }
    },

    events: {},

    methods: {},

    created() {

    },

    started() {

    },

    stopped() {

    }
};
