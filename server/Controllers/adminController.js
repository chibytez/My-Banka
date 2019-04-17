import { accounts, transactions } from '../model/ultilities';

class AdminController {


    /**
     *
     *@method activateDeactivateAccount
     * @description activates and deacivates a bank account
     * @param {object} req - the request object
     * @param object*} res - the response object
     * @memberof AdminController
     */
    static activateDeactivateAccount(req, res) { 
    const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
        return res.status(404).
        send('The account with the given Account Number was not found.');
    }
    account.accountNumber = req.body.accountNumber;
    account.status= req.body.status;
    return res.status(200).json({
        status: '200',
        data: {
          
          account: accounts.find((r) => r.accountNumber === account.accountNumber),
        },
      });
};


/**
 *
 *@method deletebankAccount
 * @description  deletes an account
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AdminController
 */
static deleteBankAccount(req, res) { 
     const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
     if (!account) {
         return res.status(404).
         send('The request with the given ID was not found.');
     }

     const index = accounts.indexOf(account);
     accounts.splice(account, 1);

     res.status(203)
     .json({
        status: '203',
        message: 'Account successfully deleted',
      });
 };


 /**
  *
  * @method getAllAccounts
  * @description it can get all users accounts
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static  getAllAccounts  (req, res)  {
    res.status(200).json({
        status: '200',
        data: accounts,
      });
 };


/**
  *
  * @method getAllAccountById
  * @description it can get a users accounts by account number
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static getAccountById (req, res) {
     const account = accounts.find((r) => r.accountNumber === parseInt(req.params.accountNumber));
     if (!account) {
         return res.status(404).send('The account with the given account number was not found.');
    }
  
     res.status(200)
     .json({
         status : '200',
         data: account,
     })
 };

 /**
  *
  * @method debitAccount
  * @description it can debit a user account
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
static debitAccount (req, res) {
    const transaction = {
        id: transactions.length + 1,
        accountNumber : req.body.accountNumber ,
        cashier: req.body.cashier,
        amount : req.body.amount,
        type : req.body.type,
        accountBalance : req.body.accountBalance
    }
    transactions.push(transaction);
    res.status(201)
    .json({
    status: '201',
    message: 'account debitted',
    data: transaction,
    });
};

/**
  *
  * @method creditAccount
  * @description it can credit a user account
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
static creditAccount (req, res) {
    const transaction = {
        id: transactions.length + 1,
        accountNumber : req.body.accountNumber ,
        cashier: req.body.cashier,
        amount : req.body.amount,
        type : req.body.type,
        accountBalance : req.body.accountBalance
    }
    transactions.push(transaction);
    res.status(201)
    .json({
        status: '201',
        message: 'account creditted',
        data: transaction
    })
};

};

export default AdminController;