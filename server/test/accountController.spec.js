import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should()

describe('USER ACCOUNT CONTROLLER API ENDPOINT', () => {
    it('should create an account on /accounts/ POST ', (done) => {
        const account = {
            id: 1,
        firstName:'becky',
        lastName:'uwah',
        accountNumber: 1,
        email: 'beckyuwah@gmail.com',
        type:'savings',
        openingBalance: 34000.90
        };
        chai.request(app)
          .post('/api/v1/accounts')
          .send(account)
          .end((error, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            done();
          });
      });

});