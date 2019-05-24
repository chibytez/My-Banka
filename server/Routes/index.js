import route  from './route';

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).json({
                 message: 'My Banka'
             }));

  app.get('/api/v1', (req, res) => res.status(200).json({
            message: 'Welcome to My-Banka App Api, Version 1'
         }));

         route(app);
 
  app.use((req, res, next) => {
         res.status(404).json({
             message: 'not found'
         });
        });      
 
};

export default routes;


