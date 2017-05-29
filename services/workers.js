'use strict';

const BaseService = require('./base');

class WorkersService extends BaseService{

    constructor(workersRepository, contacts){
        super(workersRepository);
        this._repository = workersRepository;
        this._contacts = contacts;
    }

    readChunk(options) {
        options = Object.assign({}, this._defaults.readChunk, options);

        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;
        return this._repository
            .findAll({
                limit: limit,
                offset: offset,
                order: [[options.orderField, options.order.toUpperCase()]],
                raw: true
            })
    }

    read(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            return Promise.reject('invalid id');
        }
        console.log('yes');
        this._repository.findById(id, {raw: true})
            .then(worker => {
                worker.addContacts([worker]);
            });

        return this._repository.findById(id, {raw: true});
    }




}

module.exports = WorkersService;