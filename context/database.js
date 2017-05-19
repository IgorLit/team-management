'use strict';
const config = require('../config.json');
const Team = require('../models/team');
const Worker = require('../models/worker');

class DatabaseContext {

    constructor(Sequelize) {
        this.sequelize = new Sequelize(
            config.db.name,
            config.db.user,
            config.db.password,
            this._getSequelizeOptions(config)
        );
        this.team = Team(Sequelize, this.sequelize);
        this.worker = Worker(Sequelize, this.sequelize);
        this._createLinks();
    }


    _getSequelizeOptions(config) {
        return {
            host: config.db.host,
            dialect: config.db.dialect,
            logging: false,
            define: {
                timestamps: true,
                paranoid: true,
                defaultScope: {
                    where: {
                        deletedAt: {$eq: null}
                    }
                }
            }
        };
    }
    _createLinks(){
        this.team.hasMany(this.worker);
        this.worker.belongsTo(this.team);
    }
}
module.exports = DatabaseContext;