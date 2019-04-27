import db from '../model/database';


db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL, type VARCHAR(40))', (err, res) => {
  if (err) {
    return err;
  }
});


    if (err) {
      return err;
    }
  });



db.query('CREATE TABLE IF NOT EXISTS accounts(id SERIAL PRIMARY KEY NOT NULL, accountNumber INTEGER, createdon date NOT NULL DEFAULT CURRENT_DATE, owner INTEGER NOT NULL, type VARCHAR(40)  NOT NULL, status VARCHAR(20), balance NUMERIC(10,2))', (err, res) => {
  if (err) {
    return err;
  }
});