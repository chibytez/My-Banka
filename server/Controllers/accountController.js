
import db from '../model/database';
import Validator from 'validatorjs';
import { accountValidation } from '../helper/validations/accountValidation';
import { log } from 'util';

class AccountController{

/**
 *
 *@method creatBankAccount
 * @description  deletes an account
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AccountController
 */
static async createBankAccount(req, res) {

  
  try {
    const { user,admin  } = req.userInfo;
   
  const { 
     type, balance 
    } = req.body;

   const accountNumber = Math.floor(1000000000 + Math.random() * 90000000);
   const validation = new Validator({
    type, balance }, accountValidation);
    validation.passes( async() => { 
  
    const query = { 
        text: 'INSERT INTO accounts( owner, accountNumber, type, status, balance) VALUES( $1, $2, $3, $4, $5) RETURNING *',
        values: [user, accountNumber, type, 'active', balance],
      };


  const result = await db.query(query);
  
  if (result.rows[0] === 0) {
    return res.status(404).json({
      message: "no user found"
    })
  }
    const sql = {
      text: 'SELECT Acc.accountNumber, U.firstName, U.lastName, U.email, Acc.type, Acc.balance FROM accounts Acc LEFT JOIN users U ON Acc.owner = U.id where U.id =$1',
      values: [user],
    }
 
  
  const accountSelect = await db.query(sql);

 return  res.status(201).json({
    success: true,
    message: 'account Successfully created',
    account: result.rows[0],  

  })

});  
validation.fails(() => {
  res.status(400).json(validation.errors);
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
 *@method UserGetAllBankAccount
 * @description  user can view all bank accounts bank account 
 * @param {array} req -the request body
 * @param {array} res - the object body
 * @memberof AccountController
 */
static async UserGetAllBankAccount (req,res){
  console.log('came to userId');
  const { email } = req.params;
  console.log('email', email);
    try {
        const accountQuery= 'select accounts.id, accounts.accountnumber, accounts.createdon,accounts.status, accounts.type, accounts.balance from accounts INNER JOIN users ON accounts.owner = users.id WHERE  users.email = $1';
      const accounts = await db.query(accountQuery, [email]);
      console.log('account',accounts, accounts.rows.length);
      if (accounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: accounts.rows,
        });
      }
   
      return res.status(404).json({
        status: 404,
        error: 'account not found',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'err detected',
      });
    }
 }  


 /**
 *
 *@method userViewSpecificAccount
 * @description  user can view a specific bank account 
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AccountController
 */
static async userViewSpecificAccount (req,res){
  try {
      const { accountNumber } = req.params;
      const accountQuery = `select id, createdon, accountnumber, type, status, 
                            balance FROM accounts  WHERE accountnumber = $1`;    
      const accounts = await db.query(accountQuery, [accountNumber]);
 
      if (accounts.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            data: accounts.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
  } catch (error) {
      return res.status(500).json({
          status: 500,
          error: 'Error detected',
        });
  }
  }
}
export default AccountController;
