import db from '../model/database';

class TransactionController{
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
  };
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
};

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
      };
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
};


};

export default TransactionController;