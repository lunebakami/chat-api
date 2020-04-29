const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AdminController = require('./app/controllers/AdminController');
const MessageController = require('./app/controllers/MessageController');
const SessionController = require('./app/controllers/SessionController');
const SearchController = require('./app/controllers/SearchController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:username', UserController.show);

routes.post('/messages', MessageController.store);
routes.get('/messages', MessageController.index);

routes.post('/admins', AdminController.store);
routes.get('/admins/:username', AdminController.show);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.delete('/messages/:id', MessageController.destroy);
routes.get('/search', SearchController.index);

module.exports = routes;
