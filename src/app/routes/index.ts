import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { semesterRouter } from '../modules/academicSemister/academicSemester.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/semester',
    route: semesterRouter,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
