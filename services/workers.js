'use strict';

const BaseService = require('./base');

class WorkersService extends BaseService{

    constructor(workersRepository){
        super(workersRepository);
    }

}

module.exports = WorkersService;