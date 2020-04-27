import { Router } from 'express';
// controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
// routes instance
const routes = new Router();

// user routes
routes.post('/users', UserController.store);
// session route
routes.post('/session', SessionController.store);
// from here every route must have the authentication token

export default routes;
