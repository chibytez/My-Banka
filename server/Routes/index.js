import accountRoute from './accountRoute';
import adminRoute from './adminRoute';
import auth from './authRoute';

const routes = (app) => {

    accountRoute(app);
    adminRoute(app);
    auth(app);

    app.get('/', (req, res) => res.status(200).json({
        message: 'My Banka'
    }));

    app.get('/api/v1', (req, res) => res.status(200).json({
        message: 'Welcome to My-Banka App Api, Version 1'
    }));

    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
};

export default routes;