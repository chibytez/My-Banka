import {
    activateDeactivateAccount,
    deleteBankAccount,
    creditDebitAccount,
    getAllAccounts
    } from '../Controllers/adminController';


const adminRoute = (app) => {
    app.patch('/api/v1/account/:id', activateDeactivateAccount);
    app.delete('/api/v1/accounts/:id', deleteBankAccount);
    app.post('/api/v1/transactions/:id', creditDebitAccount);
    app.get('/api/v1/accounts', getAllAccounts);
}

export default adminRoute;