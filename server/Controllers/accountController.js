
import db from '../model/database';
import { dbResults } from '../helper/ultility';



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
    const { 
       owner,type, status, balance 
      } = req.body;

      const accountNumber = Math.floor(1000000000 + Math.random() * 90000000);

      const query = {
          text: 'INSERT INTO accounts ( owner, accountNumber, type, status,balance) VALUES( $1, $2, $3, $4, $5) RETURNING *',
          values: [owner, accountNumber, type, status, balance],
        };
        
  try {
    
    
    const result = await db.query(query);
    console.log(result.rows[0]);
    if (result.rows[0]) {
      const sql = {
        text: 'SELECT Acc.accountNumber, U.firstName, U.lastName, U.email,Acc.type, Acc.balance FROM accounts Acc INNER JOIN users U ON Acc.owner = U.id where U.id =$1',
        values: [owner],
      }
    
    const accountSelect = await db.query(sql);

   return  res.status(200).json({
      success: true,
      message: 'account Successfully created',
      account: accountSelect.rows[0],   
    })
  }
         
  } catch (err) {
    return res.status(500).json({
                status: 500,
                err: 'Error Detected',
              });
  }  
  }



};
export default AccountController;
