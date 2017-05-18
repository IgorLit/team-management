'use strict';

module.exports = class TeamsController{
    constructor(workersService, teamsService){
        this._workersService = workersService;
        this._teamsService = teamsService;
    }
};