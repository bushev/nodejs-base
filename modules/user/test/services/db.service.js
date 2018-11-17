'use strict';

module.exports = {

    name: 'db',

    actions: {

        insert: {
            async handler(ctx) {

                return ctx.params;
            }
        }
    }
};
