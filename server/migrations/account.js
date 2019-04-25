import db from '../model/database';

const values = ['45667546', 1,'savings', 'active', 39000.80,];
   const account =  db.query('INSERT into accounts(accountNumber,  owner, type,status,balance)VALUES($1,$2,$3,$4,$5)', values);

