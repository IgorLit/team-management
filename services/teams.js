'use strict';

const BaseService = require('./base');

class TeamsService extends BaseService{

    constructor(teamsRepository, workersRepository){
        super(teamsRepository);
    }

}

module.exports = TeamsService;