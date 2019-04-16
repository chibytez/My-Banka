import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should()

describe('ADMIN CONTROLLER API ENDPOINT', () => {
    it("should get all accounts", (done) => {
        chai.request(app)
            .get('/api/v1/accounts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
    });

    it("should get a users account", (done) => {
        const accountNumber = 1;
        chai.request(app)
            .get(`/api/v1/accounts/${accountNumber}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
    });

    it('should activate or deactivate an account PUT', (done) => {
        const account = {
            accountNumber:1,
            status:'active'
        };
        chai.request(app)
          .patch('/api/v1/account/1')
          .send(account)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });

      it('should delete a SINGLE Account on /accounts/<id> DELETE', (done) => {
        chai.request(app)
          .delete('/api/v1/accounts/1')
          .end((error, res) => {
            res.should.have.status(203);
            res.body.should.be.a('object');
            done();
          });
      });
      
      it('should credit an account on /transactions/ POST ', (done) => {
        const transaction = {
            id: 1,
        accountNumber : '1',
        cashier: 2,
        amount : 4500.00,
        type : 'credit',
        accountBalance : '#340000'
        };
        chai.request(app)
          .post('/api/v1/transactions/2/credit')
          .send(transaction)
          .end((error, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            done();
          });
      });

      it('should debit an account /transactions/ POST ', (done) => {
        const transaction = {
            id: 2,
        accountNumber : '2',
        cashier: 4,
        amount : 4500.00,
        type : 'debiti',
        accountBalance : '#340000'
        };
        chai.request(app)
          .post('/api/v1/transactions/2/debit')
          .send(transaction)
          .end((error, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            done();
          });
      });

});