import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Validator from 'validatorjs';

import { signUpValidation, loginValidation } from '../helper/validations/validation';

import user from '../model/database';


class UserController{

/**
  *
  * @method signUp
  * @description controller for the sign up api endpoint
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof UserController
  */
 signUp (req, res) {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const validation = new Validator({
    firstName, lastName, password, email,
  }, signUpValidation);
  validation.passes(() => {
    const sql = {
      text: 'SELECT * FROM users WHERE email= $1',
      values: [email],
    };
    user.query(sql, (err, result) => {
      if (result.rows.length > 0) {
        return res.status(409).json({
          errors: {
            message: ['Email already exists'],
          },
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const query = {
            text:
              'INSERT INTO users(email, firstName, lastName, password, admin) VALUES($1, $2, $3, $4, $5 ) RETURNING *',
            values: [email, firstName,lastName, hash, false],
          };
          user.query(query)
            .then(data => jwt.sign({ user: data.rows[0].id }, process.env.SECRET_KEY, (err, token) => res.status(201).json({
              success: true,
              status: '201',
              message: 'user registration was successful',
              data: data.rows[0],
              token,
            })))
            .catch(error => res.status(500).json({ message: error.message }));
        });
      });
    });
  });
  validation.fails(() => {
    res.status(400).json(validation.errors);
  });
};

/**
  *
  * @method login
  * @description controller for the login api endpoint
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof UserController
  */
login (req, res) {
  const { email, password } = req.body;
  const validation = new Validator({ password, email }, loginValidation);
  validation.passes(() => {
    const sql = {
      text: 'SELECT * FROM users WHERE email= $1',
      values: [email],
    };
    user.query(sql)
      .then((result) => {
        if (result && result.rows.length === 1) {
          bcrypt.compare(password, result.rows[0].password, (error, match) => {
            if (match) {
              if (result && result.rows.length === 1) {
                delete result.rows[0].password;
                jwt.sign({ user: result.rows[0].id }, process.env.SECRET_KEY, (err, token) =>
                  res.status(201).json({
                    status: '201',
                  success: true,
                  message: 'user successful login',
                  data: result.rows[0],
                  token,
                }));
              } 
              else {
                res.status(400).json({
                  success: false,
                  message: 'Your email or password is incorrect',
                });
              }
            }
          });
        }
      })
      .catch(error => res.status(500).json({ message: error.message }));
  });
  validation.fails(() => {
    res.status(400).json(validation.errors);
  });
}
}

export default new UserController();