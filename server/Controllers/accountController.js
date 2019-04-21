
import db from '../model/database';

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

 static async UserGetAllBankAccount (req,res){
  const { email } = req.params;
    try {
        const accountQuery= 'select accounts.id, accounts.accountnumber, accounts.createdon,accounts.status, accounts.type, accounts.balance from accounts INNER JOIN users ON accounts.owner = users.id WHERE  users.email = $1';
      const accounts = await db.query(accountQuery, [email]);
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

};
export default AccountController;
