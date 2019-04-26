import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcryptjs';
import app from '../../app';
import db from '../model/database';
chai.use(chaiHttp);

let token;
let accountNumber = 4567890;
let id = 1;

async function createAdmin() {
  const query = `INSERT INTO users(firstName, lastname, email, password, admin,type)
  VALUES($1, $2, $3, $4, $5, $6) RETURNING email, firstname, lastname, id`;
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash('chibyke', salt);
const values = ['Aniaku', 'Chibuike', 'aniakunnakeziee@gmail.com', hash, true, 'staff'];
return db.query(query, values);
  }

  describe('tests for Transaction controller', () => {
    before(async () => {
      await createAdmin();
    });

    it('should get login and return admin token', (done) => {
        const user = {
            email: 'chibuikeaniaku@gmail.com',
            password: 'chibyke',
        };
        chai.request(app)
        .post('/api/v1/auth/login')
          .send(user)
          .end((err, res) => {
                 
            token = res.body.token;
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('token')
            done();
          });
      });

      it('should create a new account', (done) => {
        const accounts = {
          type: 'current',
          balance: 100,
        };
       chai.request(app)
        .post('/api/v1/accounts')
        .set('token', token)
      .send(accounts)
      .end((err, res) => {
       
           expect(res.status).to.equal(201);
              expect(res.body).to.have.property('success');
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('account');
              done();
            });
        });
    
        describe('/POST credit account', () => {
            it('should credit an account', (done) => {
              const transact = {
                amount: 100,
              };
              chai.request(app)
              .post(`/api/v1/transactions/${45667546}/credit`)
                .set('token', token)
                .send(transact)
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.property('status');
                  expect(res.body).to.have.property('data');
                  done();
                });
            });

            it('should fail to credit an account when account number is incorrect', (done) => {
                const account = {
                  amount: 100,
                };
                chai.request(app)
                .post(`/api/v1/transactions/${accountNumber}3/credit`)
                  .set('token', token)
                  .send(account)
                  .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                  });
              });
            })

describe('/POST debit Transaction', () => {
    it('should debit an account', (done) => {
      const transact = {
        amount: 100,
      };
      chai.request(app)
      .post(`/api/v1/transactions/${45667546}/debit`)
        .set('token', token)
        .send(transact)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        })
});

it('should fail to debit an account when account number is incorrect', (done) => {
    const account = {
      amount: 100,
    };
     chai.request(app)
     .post(`/api/v1/transactions/${accountNumber}3/debit`)
      .set('token', token)
      .send(account)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('account number not found');
        done();
      });
  });

});


describe('/GET  a specific transaction by account ID', () => {
    it('should get a specific transaction detail', (done) => {
      chai.request(app)
      .get(`/api/v1/transactions/${1}`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should fail to fetch transaction when the number is not correct', (done) => {
        chai.request(app)
        .get(`/api/v1/transactions/${id}o`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
});

describe('/GET  a specific account transaction history', () => {
    it('should get a user Account transaction history', (done) => {
      chai.request(app)
      .get(`/api/v1/accounts/${4566678}/transactions`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to fetch transaction when the number is not correct', (done) => {
        chai.request(app)
        .get(`/api/v1/accounts/${accountNumber}o/transactions`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
  });
});