import express from 'express';
import { UserRouter } from '../modules/users/user.route';


const router = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRouter,
  }
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
