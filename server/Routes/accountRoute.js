import {
     createAccount
     } from '../Controllers/accountController';


const accountRoutes = (app) => {
    app.post('/api/v1/accounts',createAccount);
}

export default accountRoutes;