import db from '../model/database';
import { runInNewContext } from 'vm';
class UserId{
  static async userGetAccountNumbers(req, res, next) {
    
  try {
    const { email } = req.params;
    
   
    const getAccountNumber = `select A.createdon, A.accountnumber, U.email, U.id, A.type, A.status, 
    A.balance from accounts A left join users U on A.owner = U.id where U.email = $1`;
    const result = await db.query(getAccountNumber, [email]);
    


    const { user, cashier } = req.userInfo;
  
    if (cashier === 'client') {
     
      if(!result.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'user email Not found',
        });
      }
      if (result.rows[0].id !== user) {
        return res.status(403).json({
          status: 403,
          error: 'You cannot access someone\'s account details',
        });
      }
    }
    next();
  } catch(err){
    return res.status(500).json({
      status: 500,
      err: 'error detected',
  })
}
  }

  static async userGetSpecificAccount(req, res, next) {
    try {
      const { accountNumber } = req.params;
     
      const getAccountNumber = `select A.createdon, A.accountnumber, U.email, U.id, A.type, A.status, 
      A.balance from accounts A left join users U on A.owner = U.id where A.accountnumber = $1`;
      const result = await db.query(getAccountNumber, [accountNumber]);
  
  
      const { user, cashier } = req.userInfo;
    
      if (cashier === 'client') {
        if(!result.rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'user account number Not found',
          });
        }
        if (result.rows[0].id !== user) {
          return res.status(403).json({
            status: 403,
            error: 'You cannot access someone\'s account details',
          });
        }
      }
      next();
    } catch(err){
      return res.status(500).json({
        status: 500,
        err: 'error detected',
    })
  }
    }
    static async userGetTransactionHistory(req, res, next) {
      try {
        const { accountNumber } = req.params;
       
        const getAccountNumber = `select A.createdon, A.accountnumber, U.email, U.id, A.type, A.status, 
        A.balance from accounts A left join users U on A.owner = U.id where A.accountnumber = $1`;
        const result = await db.query(getAccountNumber, [accountNumber]);
    
    
        const { user, cashier } = req.userInfo;
      
        if (cashier === 'client') {
          if(!result.rows[0]) {
            return res.status(404).json({
              status: 404,
              error: 'user account Not found',
            });
          }
          if (result.rows[0].id !== user) {
            return res.status(403).json({
              status: 403,
              error: 'You cannot access someone\'s account details',
            });
          }
        }
        next();
      } catch(err){
        return res.status(500).json({
          status: 500,
          err: 'error detected',
      })
    }
      }

      static async userGTransactionById(req, res, next) {
        try {
          const { id } = req.params;
         
          const getAccountNumber = `select id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions  WHERE id = $1`;
          const result = await db.query(getAccountNumber, [ id ]);
      
      
          const { user, cashier } = req.userInfo;
        
          if (cashier === 'client') {
            if(!result.rows[0]) {
              return res.status(404).json({
                status: 404,
                error: 'user transaction ID Not found',
              });
            }
            if (result.rows[0].id !== user) {
              return res.status(403).json({
                status: 403,
                error: 'You cannot access someone\'s account details',
              });
            }
          }
          next();
        } catch(err){
          return res.status(500).json({
            status: 500,
            err: 'error detected',
        })
      }
        }
  
}

export default UserId ;