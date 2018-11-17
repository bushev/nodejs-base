'use strict';

module.exports = {

    name: 'db',

    settings: {},

    dependencies: [],

    actions: {

        insert: {
            handler(ctx) {

                // TODO: Insert to mongodb
                return ctx.params;
                // return await ctx.call('db.insert', ctx.params);
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
