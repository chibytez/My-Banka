import UserController from "../Controllers/UserController";
import AdminController from "../Controllers/adminController";
import AccountController from "../Controllers/accountController";
import TransactionController  from "../Controllers/transactionController";

import verifyToken from '../middleware/userAuth';
import userAuth from '../middleware/verifyToken';
import isAdmin from '../middleware/isAdmin';
 import isCashier from '../middleware/isCashier';
import userId from '../middleware/userId';


const route = (app) => {
     //sign up and login routes
     app.post('/api/v1/auth/signUp', UserController.signUp);
     app.post('/api/v1/auth/login', UserController.login);

     //account route
     app.patch('/api/v1/account/:accountNumber', verifyToken, userAuth,isAdmin, AdminController.activateDeactivateAccount);
     app.delete('/api/v1/accounts/:accountNumber',verifyToken, userAuth,isAdmin, AdminController.deleteBankAccount )
     app.get('/api/v1/accounts',verifyToken, userAuth,isAdmin, AdminController.getAllAccounts );
     app.get('/api/v1/accounts/:accountNumber',verifyToken, userAuth, isAdmin, AdminController.getAccountByAccountNumber);
     app.post('/api/v1/auth/makeAdmin',verifyToken, userAuth,isAdmin, AdminController.makeAdmin);
     app.get('/api/v1/user/:email/accounts',verifyToken, userAuth, userId.userGetAccountNumbers, AccountController.UserGetAllBankAccount);
     app.get('/api/v1/account/:accountNumber',verifyToken,userAuth,userId.userGetSpecificAccount, AccountController.userViewSpecificAccount);
     app.post('/api/v1/accounts', verifyToken, userAuth, AccountController.createBankAccount);
    

     // transaction route
     app.post('/api/v1/transactions/:accountNumber/debit',verifyToken, userAuth, TransactionController.debitAccount );
     app.post('/api/v1/transactions/:accountNumber/credit', verifyToken, userAuth, TransactionController.creditAccount);
     app.get('/api/v1/accounts/:accountNumber/transctions', verifyToken, userAuth,userId.userGetTransactionHistory ,TransactionController.userGetAccountTransactionHistory )
     app.get ('/api/v1/transactions/:id',verifyToken, userAuth, userId.userGTransactionById, TransactionController.userGetTransactionById)
     
};

export default route;
