'use strict';

const express = require('express');

module.exports = (workersService, teamsService) => {
    const router = express.Router();

    const workersController = new require('./workers')(workersService);
    const teamsController = new require('./teams')(workersService, teamsService);

    router.use('/workers', workersController);
    router.use('/teams', teamsController);

    return router;
};
