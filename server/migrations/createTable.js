import db from '../model/database';


db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, firstName VARCHAR(40) NOT NULL,  lastName VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL)', (err, res) => {
  if (err) {
    return err;
  }
});


db.query('CREATE TABLE IF NOT EXISTS transactions(id SERIAL PRIMARY KEY NOT NULL, createdOn timestamp without time zone, type VARCHAR(40) NOT NULL, accountNumber INTEGER, cashier INTEGER, amount NUMERIC(5, 2) NOT NULL, oldBalance NUMERIC(5,2) NOT NULL, newBalance NUMERIC(5,2) NOT NULL)', (err, res) => {
    if (err) {
      return err;
    }
  });



db.query('CREATE TABLE IF NOT EXISTS accounts(id SERIAL PRIMARY KEY NOT NULL, accountNumber INTEGER, createdOn timestamp without time zone, owner INTEGER, type VARCHAR(40),  status VARCHAR(20) NOT NULL, balance NUMERIC(5,2))', (err, res) => {
  if (err) {
    return err;
  }
});

