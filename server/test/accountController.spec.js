import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcryptjs';
import app from '../../app';
import db from '../model/database';
chai.use(chaiHttp);

 let email ;
 let accountNumber;
 let token;

async function createAdmin() {
    const query = `INSERT INTO users(firstName, lastname, email, password, admin,type)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING email, firstname, lastname, id`;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('chibyke', salt);
    const values = ['Aniaku', 'Chibuike', 'aniakuchibuike@gmail.com', hash, true, 'staff'];
    return db.query(query, values);
  }

  describe('tests for Account controller', () => {

    before(async () => {
        await createAdmin();
      });

      it('should get login and return admin token', (done) => {
        const user = {
          email: 'aniakuchibuike@gmail.com',
      password: 'chibyke',
        };
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
            token = res.body.token;  
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('token');
            done();
          });
      });

    
      describe('/POST create account', () => {
        it('should create a new account', (done) => {
          const accounts = {
            type: 'current',
            balance: 10000,
          };
          chai.request(app)
        .post('/api/v1/accounts')
        .set('token',token)
        .send(accounts)
        .end((err, res) => {
          accountNumber = parseInt(res.body.account.accountnumber, 10);
          email = res.body.account.email;
              expect(res.status).to.equal(201);
              expect(res.body).to.have.property('success');
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('account');
              done();
            });
        });

        });

      describe('/PATCH  account', () => {
        it('should change account status', (done) => {
          const account = {
            status: 'dormant',
          };
          chai.request(app)
          .patch(`/api/v1/account/${accountNumber}`)
            .set('token', token)
            .send(account)
            .end((err, res) => {
              
              expect(res.status).to.equal(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');
              done();
            });
        });
      });
   describe('/POST USER GET ALL Accounts By Email', () =>{
    it('should get a specific account detail by email', (done) => {
      chai.request(app)
      .get(`/api/v1/user/${email}/accounts`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to fetch specific account when the email is not correct', (done) => {
      chai.request(app)
      .get(`/api/v1/user/${email}d/accounts`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  })
    describe('/GET Admin GET ALL Accounts By Account Number', () =>{
      it('should get a specific account detail by email', (done) => {
        chai.request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            done();
          });
        });

        it('should fail to get when account Number is not correct', (done) => {
          chai.request(app)
          .get(`/api/v1/accounts/${accountNumber}n`)
            .set('token', token)
            .end((err, res) => {
              expect(res.status).to.equal(500);
              done();
            });
          });
  

    });


    describe('/GET  account by account Number', () => {
      it('should get a specific account detail', (done) => {
        chai.request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            done();
          });
      });

      it('should fail to fetch accounts when the number is not correct', (done) => {
        chai.request(app)
        .get(`/api/v1/accounts/${accountNumber}1`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
    });

    describe('/GET all accounts', () => {
      it('should get all accounts', (done) => {
        chai.request(app)
        .get('/api/v1/accounts')
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            done();
          });
      });
    });
    describe('/DELETE  account by account Number', () => {
      it('should delete a specific account detail', (done) => {
        chai.request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status');
            done();
          });
      });
      it('should fail to delte accounts when the number is not correct', (done) => {
        chai.request(app)
        .delete(`/api/v1/accounts/${accountNumber}1`)
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
  });

});

           