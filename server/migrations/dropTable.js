import db from '../model/database';

db.query('DROP TABLE users', (err, res) => {
  if (err) {
    return err;
  }
});

db.query('DROP TABLE accounts', (err, res) => {
    if (err) {
        return err;
      }
    });

db.query('DROP TABLE transactions', (err, res) => {
    if (err) {
      return err;
    }
    db.end();
  });