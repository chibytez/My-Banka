import db from '../model/database';



const values = ['admin', 'admin', 'chibuifkebyke@gmail.com', 'chibyke', 'true', 'staff'];
   const user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);

