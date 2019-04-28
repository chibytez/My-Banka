import bcrypt from 'bcryptjs';
import db from '../model/database';

require('dotenv').config();

const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD);

const values = ['admin', 'admin', 'chibuifkebe@gmail.com', adminPassword, 'true', 'staff'];
 const user =  db.query('INSERT into users(firstName, lastName, email, password, admin, type)VALUES($1,$2,$3,$4,$5, $6)', values);