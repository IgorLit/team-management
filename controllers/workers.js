'use strict';

const express = require('express');

class WorkersController {
    constructor(workersService) {
        this._service = workersService;
        this.router = express.Router();
        this._registerRoutes();
    }

    _getRoutes(){
        return {
            '/': [{method: 'get', cb: this.readAll}, {method: 'post', cb: this.create}],
            '/:id': [{method: 'get', cb: this.read}, {method: 'delete', cb: this.del}, {method: 'put', cb: this.update}]
        }
    }

    readAll(req, res) {
        this._service.readChunk(req.params)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    read(req, res) {
        this._service.read(req.params.id)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    create(req, res) {
        this._service.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    update(req, res) {
        this._service.update(req)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    del(req, res) {
        const id = req.params.id;
        this._service.delete(id)
            .then((data) => res.json(data))
            .catch((err) => res.send({error: err.message}));
    }

    _registerRoutes() {
        let routes = this._getRoutes();
        for (let route in routes) {
            if (!routes.hasOwnProperty(route)) {
                continue;
            }

            let handlers = routes[route];

            if (handlers === undefined) continue;

            for (let handler of handlers) {
                this.router[handler.method](route, handler.cb);
            }
        }
    }

}

module.exports =  WorkersController;