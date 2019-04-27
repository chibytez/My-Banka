import UserController from "../Controllers/UserController";
import AdminController from "../Controllers/adminController";
import AccountController from "../Controllers/accountController";
import TransactionController  from "../Controllers/transactionController";

import verifyToken from '../middleware/userAuth';
import userAuth from '../middleware/verifyToken';
import isAdmin from '../middleware/isAdmin';
import isCashier from '../middleware/isCashier'


const route = (app) => {
     //sign up and login routes
     app.post('/api/v1/auth/signUp', UserController.signUp);
     app.post('/api/v1/auth/login', UserController.login);

     //account route
     app.patch('/api/v1/account/:accountNumber', verifyToken, userAuth,isAdmin, AdminController.activateDeactivateAccount);
     app.delete('/api/v1/accounts/:accountNumber',verifyToken, userAuth,isAdmin, AdminController.deleteBankAccount )
     app.get('/api/v1/accounts',verifyToken, userAuth,isAdmin, AdminController.getAllAccounts );
     app.get('/api/v1/accounts/:accountNumber',verifyToken, userAuth, isAdmin, AdminController.getAccountByAccountNumber);
     app.get('/api/v1/user/:email/accounts',verifyToken, userAuth, AccountController.UserGetAllBankAccount);
     app.get('/api/v1/accounts/:accountNumber',verifyToken, userAuth,AccountController.userViewSpecificAccount);
     app.post('/api/v1/accounts', verifyToken, userAuth, AccountController.createBankAccount);

     // transaction route
     app.post('/api/v1/transactions/:accountNumber/debit',verifyToken, userAuth,isCashier, TransactionController.debitAccount );
     app.post('/api/v1/transactions/:accountNumber/credit', verifyToken, userAuth,isCashier, TransactionController.creditAccount);
     app.get('/api/v1/accounts/:accountNumber/transctions', verifyToken, userAuth,TransactionController.userGetAccountTransactionHistory )
     app.get ('/api/v1/transactions/:id',verifyToken, userAuth, TransactionController.userGetTransactionById)
     
};

export default route;
