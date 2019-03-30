import {
    activateDeactivateAccount,
    deleteBankAccount
    } from '../Controllers/adminController';


const adminRoute = (app) => {
    app.patch('/api/v1/account/:id',activateDeactivateAccount);
    app.delete('/api/v1/accounts/:id',deleteBankAccount)
}

export default adminRoute;