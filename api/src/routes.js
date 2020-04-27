import { Router } from 'express';
// controllers
import UserController from './app/controllers/UserController';
// routes instance
const routes = new Router();

// user routes
routes.post('/users', UserController.store);

export default routes;
