import db from '../model/database';

const values = ['45667546', 1,'savings', 'active', 39000.80,];
   let account =  db.query('INSERT into accounts(accountNumber, owner, type,status,balance)VALUES($1,$2,$3,$4,$5)', values);


   const value = ['45667546', 1,'savings', 'active', 39000.80,];
    account =  db.query('INSERT into accounts(accountNumber, owner, type,status,balance)VALUES($1,$2,$3,$4,$5)', value);