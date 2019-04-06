import {
    activateDeactivateAccount,
    deleteBankAccount,
    creditDebitAccount,
    getAllAccounts,
    getAccountById
    } from '../Controllers/adminController';


const adminRoute = (app) => {
    app.patch('/api/v1/account/:accountNumber', activateDeactivateAccount);
    app.delete('/api/v1/accounts/:accountNumber', deleteBankAccount);
    app.post('/api/v1/transactions/:accountNumber', creditDebitAccount);
    app.get('/api/v1/accounts', getAllAccounts);
    app.get('/api/v1/accounts/:accountNumber', getAccountById)
}

export default adminRoute;