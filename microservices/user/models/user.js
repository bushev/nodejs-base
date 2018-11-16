'use strict';

const BaseModel = require('../../../models/base').BaseModel;

class UserModel extends BaseModel {

    constructor() {
        super();

        this.name = 'user';

        this.schemaObject = {
            email: {type: String, index: true, unique: true},
            firstName: {type: String, index: true},
            createdAt: {type: Date, 'default': Date.now, index: true, required: true}
        };
    }

    setupSchema() {
        super.setupSchema();

        // Add { password: String } to the schema
        this.schema.plugin(require('mongoose-bcrypt'));
    }

    // TODO: Refactor
    async getUserForLogIn(options) {

        const {email, password} = options;

        const user = await this.findOne({email});

        if (!user) return {reason: 'E-mail not found'};

        const valid = await user.verifyPassword(password);

        if (valid) {

            return user;

        } else {

            return {reason: 'Incorrect password'};
        }
    }
}

const instance = new UserModel();

instance.bootstrap();

module.exports = instance;
