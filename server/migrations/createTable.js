import db from '../model/database';


db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL, type VARCHAR(40))', (err, res) => {
  if (err) {
    return err;
  }
});


db.query('CREATE TABLE IF NOT EXISTS transactions(id SERIAL PRIMARY KEY NOT NULL, createdon date NOT NULL DEFAULT CURRENT_DATE, type VARCHAR(40) NOT NULL, accountnumber INTEGER, cashier INTEGER NOT NULL, amount NUMERIC(10, 2) NOT NULL, oldBalance FLOAT(2) NOT NULL, newBalance FLOAT(2) NOT NULL)', (err, res) => {
    if (err) {
      return err;
    }
  });



db.query('CREATE TABLE IF NOT EXISTS accounts(id SERIAL PRIMARY KEY NOT NULL, accountNumber INTEGER, createdon date NOT NULL DEFAULT CURRENT_DATE, owner INTEGER NOT NULL, type VARCHAR(40), status VARCHAR(20), balance NUMERIC(10,2))', (err, res) => {
  if (err) {
    return err;
  }
});