import db from '../model/database';



let values = ['admin', 'admin', 'chibuifkebyke@gmail.com', 'Chibyke8%', 'true', 'staff'];
   let user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);

 values = ['becky', 'uwah', 'beckyuwah@gmail.com', 'Chibyke8%', 'false', 'staff'];
    user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);
