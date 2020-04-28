const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const MessageController = require('./app/controllers/MessageController');

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/messages', MessageController.store);
routes.get('/messages', MessageController.index);

module.exports = routes;
