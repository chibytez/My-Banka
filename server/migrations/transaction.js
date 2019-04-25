import db from '../model/database';

const values = ['credit', 45667546 , 2, 34000.08, 45000.08, 79000.08];
   const transaction =  db.query('INSERT into transactions(type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES($1,$2,$3,$4,$5,$6)', values);

