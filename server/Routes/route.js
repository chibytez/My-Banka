import UserController from "../Controllers/UserController";
import AdminController from "../Controllers/adminController";
import AccountController from "../Controllers/accountController";
import transactionValidation from "../helper/validations/transactionValidator";
import accountValidation from "../helper/validations/accountValidation";

import verifyToken from '../middleware/userAuth';
import userAuth from '../middleware/verifyToken';


const route = (app) => {
     app.post('/api/v1/auth/signUp', UserController.signUp);
      app.post('/api/v1/auth/login', UserController.login);
     app.patch('/api/v1/account/:accountNumber', AdminController.activateDeactivateAccount);
     app.delete('/api/v1/accounts/:accountNumber',AdminController.deleteBankAccount )
     app.get('/api/v1/accounts', AdminController.getAllAccounts );
     app.get('/api/v1/accounts/:accountNumber', AdminController.getAccountById);
     app.post('/api/v1/transactions/:accountNumber/debit',verifyToken, userAuth,transactionValidation, AdminController.debitAccount );
     app.post('/api/v1/transactions/:accountNumber/credit', verifyToken, userAuth ,transactionValidation, AdminController.creditAccount);
     app.post('/api/v1/accounts', verifyToken, userAuth, accountValidation, AccountController.createBankAccount);

     
};

export default route;
