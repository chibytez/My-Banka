import db from '../model/database';
import bcrypt from 'bcryptjs';

// let salt =  bcrypt.genSalt(10);
// let hash =  bcrypt.hash('Chibyke8%', salt);
// let hash = bcrypt.hash('Chibyke8%', 10);

let values = ['admin', 'admin', 'chibuifkebyke@gmail.com',bcrypt.hashSync('Chibyke8%', 10), 'true', 'staff'];
   let user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);

 values = ['becky', 'uwah', 'beckyuwah@gmail.com', bcrypt.hashSync('Chibyke8%', 10), 'false', 'staff'];
    user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);
