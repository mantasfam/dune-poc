import v1Routes from './v1';
import { Router } from 'express';

const Routes = [
    // V1 routes
    { urlPrefix: '/v1', routes: v1Routes },
    // V2 routes
    // ...
];

const initRoutes = (router: Router) => {
    Routes.forEach((route) => {
        router.use(route.urlPrefix, route.routes);
    });
};

export { initRoutes };
