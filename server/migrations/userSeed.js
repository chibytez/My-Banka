import db from '../model/database';


const user = {
  text: 'INSERT INTO users(email, firstName,lastName, password, admin) VALUES($1, $2, $3, $4, $5 ) RETURNING id',
  values: ['example@gmail.com', 'becky','uwah', '$2b$10$x0yAFrtQxs.f83ZKpb4iM.fwQlLAcc81GDhfDuFUimrNEqEDChXha', false],
};

db.query(user, (err, res) => {
  if (err) {
    return err;
  }
  const account = {
    text: 'INSERT INTO accounts(accountNumber, firstName, lastName, email, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    values: [res.rows[0].id, 1 , 'becky', 'uwah', 'beckyuwah@gmail.com', 1, 'savings', 'active', 39000.80],
  };
  db.query(account, (err, res) => {
    if (err) {
      return err;
    }

    const transaction = {
      text: 'INSERT INTO transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance) VALUES( NOW(), $1, $2, $3,$4, $5, $6)',
      values: [res.rows[0].id, 'credit', 1,  2, 34000.08, 45000.08, 79000.08],
    };
    db.query(transaction, (err, res) => {
      if (err) {
        return err;
      }
      db.end();
    });
  });
});