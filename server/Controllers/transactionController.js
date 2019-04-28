import db from '../model/database';
import Validator from 'validatorjs';
import  emailController  from '../Controllers/emailController'; 
import { transactionValidation } from '../helper/validations/transactionValidator';

class TransactionController{



  
/**
 *
 *@method userGetAccountTransactionHistory
 * @description  user should get his transaction history
 * @param {array} req -the request body
 * @param {array} res - the response body
 * @memberof TransactionController
 */  
static async userGetAccountTransactionHistory (req,res){
try {
   const { accountNumber } = req.params;
const accountQuery = 'select id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions  WHERE accountnumber = $1';
const accounts = await db.query(accountQuery, [accountNumber]);
if (accounts.rows.length > 0) {
    return res.status(200).json({
      status: 200,
      data: accounts.rows,
    });
  }
  
  return res.status(404).json({
    status: 404,
    error: 'no transaction history for this account',
  });

} catch (err) {
    return res.status(500).json({
        status: 500,
        error: 'Error detected',
      });
}
}

/**
 *
 *@method userGetTransactionById
 * @description  user should get transaction by id
 * @param { object } req -the request object
 * @param { object } res - the response body
 * @memberof TransactionController
 */ 
static async userGetTransactionById(req,res){
try {
    const { id } = req.params;
    const accountQuery = 'select id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions  WHERE id = $1';
    const accounts = await db.query(accountQuery, [id]);
     if (accounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: accounts.rows,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No Transaction with the given id',
      });
} catch (error) {
    return res.status(500).json({
        status: 500,
        error: 'Error detected',
      });
}
}

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
      const  {user }   = req.userInfo;
      const  { accountNumber }   = req.params;
      const  { amount }  =  req.body;

const validation = new Validator({
  amount},transactionValidation);
  validation.passes( async() => { 
      const AccountQuery = 'SELECT balance FROM accounts WHERE accountnumber = $1';
      const Account= await db.query(AccountQuery, [accountNumber]);
      if (Account.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number not found',
        });         
      } 
      const oldBalance = Account.rows[0].balance
      if ( parseFloat(oldBalance) < parseFloat(amount)) {
        return res.status(400).json({
          status: 400,
          error: 'insufficient account balance',
        });
      }
      const newBalance = oldBalance - amount;
      const values = ['debit', accountNumber, user, amount, oldBalance, newBalance]
      const accountquery = `INSERT INTO transactions(type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6)returning *`;
      const { rows } = await db.query(accountquery, values);
     
      
      const updatebalanceQuery = 'UPDATE accounts SET balance = $1 WHERE accountNumber = $2';
      await db.query(updatebalanceQuery, [newBalance,accountNumber]);
       if(updatebalanceQuery){
      const emailAlertQuery = `select a.createdOn, a.accountNumber,
                      u.firstname, t.amount, t.type, u.email, a.balance from accounts as a 
                      inner join transactions t on a.accountnumber = t.accountnumber inner 
                      join users u on a.owner = u.id where a.accountnumber = $1`;   
    const emailAlert = await db.query(emailAlertQuery,[accountNumber]);
    emailController.testing(emailAlert.rows[0]);
  }
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
          });
          validation.fails(() => {
            res.status(400).json(validation.errors);
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
      const { user } = req.userInfo;
      const { accountNumber } = req.params;
      const { amount, acc } = req.body;

      const validation = new Validator({
        amount},transactionValidation);
        validation.passes( async() => { 

      const AccountQuery = 'SELECT balance FROM accounts WHERE accountnumber = $1';
      const Account= await db.query(AccountQuery, [accountNumber]);
      if (Account.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number not found',
        });
      }
      
      const oldBalance = parseFloat(Account.rows[0].balance);
      const newBalance = oldBalance + parseFloat(amount);
    
      
      const values = ['credit', accountNumber, user,amount,oldBalance,newBalance];
      const accountquery = `INSERT INTO transactions(type, accountnumber, cashier,amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6)returning *`;
      const { rows } = await db.query(accountquery, values);
      const updatebalanceQuery = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      await db.query(updatebalanceQuery, [newBalance,accountNumber]);
      if(updatebalanceQuery){
      const emailAlertQuery = `select a.createdOn, a.accountNumber,
                      u.firstname, t.amount, t.type, u.email, a.balance from accounts as a 
                      inner join transactions t on a.accountnumber = t.accountnumber inner 
                      join users u on a.owner = u.id where a.accountnumber = $1`;   
    const emailAlert = await db.query(emailAlertQuery,[accountNumber]);
    emailController.testing(emailAlert.rows[0]);
  }

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
          });
          validation.fails(() => {
            res.status(400).json(validation.errors);
          });
  } catch (err) {
      return res.status(500).json({
          status: 500,
          err: 'error detected',
        });
  }    
  }


}

export default TransactionController;