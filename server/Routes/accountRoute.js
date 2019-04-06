import {
     createAccount,
     userGetAccount
     } from '../Controllers/accountController';


const accountRoute = (app) => {
    app.post('/api/v1/accounts',createAccount);
    app.get('/api/v1/accounts/:id', userGetAccount)
}

export default accountRoute;