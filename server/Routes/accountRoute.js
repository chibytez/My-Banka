import {
     createAccount,
     userGetAccount
     } from '../Controllers/accountController';


const accountRoute = (app) => {
    app.post('/api/v1/accounts',createAccount);
}

export default accountRoute;