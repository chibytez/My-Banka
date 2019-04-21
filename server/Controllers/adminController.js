import db from '../model/database';
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
    static  async activateDeactivateAccount(req, res) { 
        try {
            const { accountNumber } = req.params;
            const { status } = req.body;
            const findAccountQuery = 'SELECT * FROM accounts WHERE accountNumber = $1'; 
            const foundAccount= await db.query(findAccountQuery, [accountNumber]);
            if (foundAccount.rows.length === 0) {
                return res.status(404).json({
                  status: 404,
                  error: 'account number not found',
                });
              }
              const updateStatusQuery = 'UPDATE accounts SET status = $1 WHERE accountNumber = $2 returning *';
              const updatedStatus= await db.query(updateStatusQuery, [status,accountNumber]);
              return res.status(200).json({
                status: 200,
                data: {
                  accountNumber,
                  status: updatedStatus.rows[0].status,
                },
              });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                err: 'Error detected',
              });
        }
         
};


/**
 *
 *@method deletebankAccount
 * @description  deletes an account
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AdminController
 */
static async deleteBankAccount(req, res) { 
    const deleteQuery = 'DELETE FROM accounts WHERE accountNumber =$1  returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.accountNumber]);

      if(!rows[0]) {
        return res.status(404).send({'message': 'account not found'});
      }
      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    } catch(error) {
       return res.status(500).json({
                status: 500,
                err: 'Error Detected',
              });
    }
 };


 /**
  *
  * @method getAllAccounts
  * @description it can get all users accounts
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static async getAllAccounts  (req, res)  {
     try {
        const allAccountQuery = ' select accounts.id, accounts.accountnumber, accounts.createdon, accounts.status, accounts.type, accounts.balance,users.firstname,users.lastname, users.email from accounts INNER JOIN users ON accounts.owner = users.id';
        const allAccounts = await db.query(allAccountQuery, []);
        if (allAccounts.rows.length > 0) {
           return res.status(200).json({
             status: 200,
             data: allAccounts.rows,
           });
         }
         return res.status(404).json({
           status: 404,
           error: 'account not found',
         });
     } catch (err) {
        return res.status(500).json({
            status: 500,
            err: 'Error Detected',
          });
     }
    
}
 
/**
  *
  * @method getAllAccountById
  * @description it can get a users accounts by account number
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static async getAccountById (req, res) {
     try {
        const { accountNumber } = req.params;
        const accountQuery = `select accounts.id, accounts.accountnumber, accounts.createdon,
     accounts.status, accounts.type, accounts.balance,users.firstname,users.lastname,
      users.email from accounts INNER JOIN users ON accounts.owner = users.id WHERE  
      accounts.accountnumber = $1`;  
      const accounts = await db.query(accountQuery, [accountNumber]);
    if (accounts.rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: accounts.rows,
      });
    }
    return res.status(404).json({
        status: 404,
        error: 'account number not found',
      });
     } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Error Detected',
     });
 };
 };
 /**
  *
  * @method debitAccount
  * @description it can debit a user account
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
static async debitAccount (req, res) {
    try {
        const  {id }   = req.userInfo;
        const  { accountNumber }   = req.params;
        const  {amount }  =  req.body;
 
  
        const AccountQuery = 'SELECT balance FROM accounts WHERE accountnumber = $1';
        const Account= await db.query(AccountQuery, [accountNumber]);
        if (Account.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'account number not found',
          });         
        } 
        const oldBalance = Account.rows[0].balance
        if (oldBalance < amount) {
          return res.status(400).json({
            status: 400,
            error: 'insufficient account balance',
          });
        }
        const newBalance = oldBalance - amount;
        const values = ['debit', accountNumber, id, amount, oldBalance, newBalance]
        const accountquery = `INSERT INTO transactions(type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6)returning *`;
        const { rows } = await db.query(accountquery, values);
       
        
        const updatebalanceQuery = 'UPDATE accounts SET balance = $1 WHERE accountNumber = $2';
        await db.query(updatebalanceQuery, [newBalance,accountNumber]);
        return res.status(200).json({
                status: 200,
                data: {
                  transactionId: rows[0].id,
                  accountNumber: rows[0].accountnumber,
                  amount: rows[0].amount,
                  cashier: rows[0].id,
                  transactionType: rows[0].type,
                  accountBalance: rows[0].newbalance,
                },
              });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          err: 'error detected',
        });
      }
 }

 


/**
  *
  * @method creditAccount
  * @description it can credit a user account
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
static async creditAccount (req, res) {
    try {
        const { id } = req.userInfo;
        const { accountNumber } = req.params;
        const { amount, acc } = req.body;
  
        const AccountQuery = 'SELECT balance FROM accounts WHERE accountnumber = $1';
        const Account= await db.query(AccountQuery, [accountNumber]);
        if (Account.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'account number not found',
          });
        }
        ;
        const oldBalance = parseFloat(Account.rows[0].balance);
        const newBalance = oldBalance + parseFloat(amount);
        console.log('value:',acc, amount, newBalance, oldBalance,typeof newBalance, typeof oldBalance);
        
        const values = ['credit', accountNumber, id,amount,oldBalance,newBalance];
        const accountquery = `INSERT INTO transactions(type, accountnumber, cashier,amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6)returning *`;
        const { rows } = await db.query(accountquery, values);
        const updatebalanceQuery = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        await db.query(updatebalanceQuery, [newBalance,accountNumber]);
        return res.status(200).json({
                status: 200,
                data: {
                  transactionId: rows[0].id,
                  accountNumber: rows[0].accountnumber,
                  amount: rows[0].amount,
                  cashier: rows[0].cashier,
                  transactionType: rows[0].type,
                  accountBalance: rows[0].newbalance,
                },
              }); 
    } catch (err) {
        return res.status(500).json({
            status: 500,
            err: 'error detected',
          });
    };    
    };


};

export default AdminController;