'use strict';

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

class BaseModel {

    constructor() {

    }

    bootstrap() {

        this.setupSchema();

        this.setupHooks();

        this.initModel();
    }

    setupSchema() {

        this.schema = new mongoose.Schema(this.schemaObject);
    }

    setupHooks() {

    }

    initModel() {

        this.model = mongoose.model(this.name, this.schema);

        this.model.on('index', err => {
            if (err) console.log(`Index issue: ${err.message}`);
        });
    }

    async insert(data) {

        const item = new this.model(data);

        return await item.save();
    }

    async findOne(query) {

        return await this.model.findOne(query);
    }

    async find(query) {

        return await this.model.find(query);
    }

    async remove(query) {

        return await this.model.remove(query);
    }

    async count(query) {

        return await this.model.countDocuments(query);
    }
}

module.exports = {
    mongoose,
    BaseModel
};
