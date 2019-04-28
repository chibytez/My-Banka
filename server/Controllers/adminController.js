import db from '../model/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Validator from 'validatorjs';

import { signUpValidation } from '../helper/validations/validation';


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
            if(status ==='active' || status === 'dormant'){
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
            } return res.status(400).json({
              stats:400,
              error:'status can only be active or dormant',
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                err: 'Error detected',
              });
        }
         
}





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
    let allAccounts;
    let allAccountQuery;
    let statustype 

    if (req.query.status === undefined) {
      allAccountQuery = 'select accounts.id, accounts.accountnumber, accounts.createdon,accounts.status, accounts.type, accounts.balance,users.email from accounts INNER JOIN users ON accounts.owner = users.id';
      allAccounts = await db.query(allAccountQuery, []);
      statustype = ""
    } else {
       const { status } = req.query;
      allAccountQuery = 'select accounts.id, accounts.accountnumber, accounts.createdon, accounts.status, accounts.type, accounts.balance, users.email from accounts INNER JOIN users ON accounts.owner = users.id WHERE accounts.status = $1';
      allAccounts = await db.query(allAccountQuery, [status]);
      statustype = status;  
    }
    if (allAccounts.rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: allAccounts.rows,
      });
    }
   
    return res.status(404).json({
      status: 404,
      error: `no ${statustype} account found`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: 'Err Detected',
    });
  }
}

 
/**
  *
  * @method getAllAccountByAccountNumber
  * @description it can get a users accounts by idx
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static async getAccountByAccountNumber (req, res) {
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
 }
 }
 /**
 *
 *@method deletebankAccount
 * @description  deletes an account
 * @param {object} req -the request body
 * @param {object} res - the response body
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
}

 /**
  *
  * @method makeAdmin
  * @description admin can made a user an admin 
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof AdminController
  */
 static async makeAdmin (req, res) {
  try {
   const {
     firstName, lastName, email, password,
   } = req.body;
  
   const validation = new Validator({
     firstName, lastName, password, email,
   }, signUpValidation);
 
   validation.passes( async() => { 
     const sql = {
       text: 'SELECT * FROM users WHERE email= $1',
       values: [email],
     };
 
     const result = await db.query(sql, [email]);
 
       if (result.rows.length > 0) {
         return res.status(409).json({
           errors: {
             message: ['Email already exists'],
           },
         });
       }
       bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(password, salt, async(err, hash) => { 
           const sql = {
             text:
               'INSERT INTO users(email, firstName, lastName, password, admin, type) VALUES($1, $2, $3, $4, $5,$6 ) RETURNING *',
             values: [email, firstName,lastName, hash, true, 'staff'],
           };
           const userResult = await db.query(sql);
 
             jwt.sign({ user: userResult.rows[0].id,admin:userResult.rows[0].admin, cashier: userResult.rows[0]}, process.env.SECRET_KEY, (err, token) => 
              res.status(201).json({
               success: true,
               status: '201',
               message: 'admin registration was successful',
               data: userResult.rows,
               token,
             }))
         });
       });
   });
 
   validation.fails(() => {
     res.status(400).json(validation.errors);
   });
  } catch (err) {
   return res.status(500).json({
     status: 500,
     error: err.message,
   });
  }
 
}
  }

export default AdminController;