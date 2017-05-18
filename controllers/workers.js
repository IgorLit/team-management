'use strict';
const express = require('express');

module.exports = class WorkersController {
    constructor(workersService) {
        this._workersService = workersService;
        this._registerRoutes = registerRoutes;
        this._router = express.Router();
        this._routes = {
            '/:id': [{method: 'get', cb: read}, {method: 'delete', cb: del}, {method: 'put', cb: update}]
        };
    }

    readAll(req, res) {
        service.readChunk(req.params)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    read(req, res) {
        service.read(req.params.id)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    create(req, res) {
        service.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    update(req, res) {
        service.update(req)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    del(req, res) {
        const id = req.params.id;
        service.delete(id)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    registerRoutes() {
        for (let route in this._routes) {
            if (!this.routes.hasOwnProperty(route)) {
                continue;
            }

            let handlers = this._routes[route];

            if (handlers === undefined) continue;

            for (let handler of handlers) {
                this._router[handler.method](route, handler.cb);
            }
        }
    }
};