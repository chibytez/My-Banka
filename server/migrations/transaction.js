import db from '../model/database';

let values = ['credit', 45667546 , 1, 34000.08, 45000.08, 79000.08];
   let transaction =  db.query('INSERT into transactions(type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES($1,$2,$3,$4,$5,$6)', values);

    values = ['debit', 4566678 , 2, 34000.08, 45000.08, 79000.08];
    transaction =  db.query('INSERT into transactions(type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES($1,$2,$3,$4,$5,$6)', values);   
