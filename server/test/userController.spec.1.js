import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should()

describe('USER SIGNUP API ENDPOINT', () => {
  it('should signUp a user account on /signUp/ POST ', (done) => {
    const user = {
      firstName: 'adam',
      lastName: 'Uwah',
      email: 'adamsmuwa@gmail.com',
      password: 'chibyke',
      type: 'client',
      admin: false,
        };
        chai.request(app)
          .post('/api/v1/auth/signUp')
          .send(user)
          .end((err, res) => {

             res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            done();
          });
        });
});

describe('USER LOGIN API ENDPOINT', () => {
  it('should login a user account on /login/ POST ', (done) => {
    const user = {
      email: 'beckyuwah@gmail.com',
      password: 'chibyke',
    }; 
     chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.status.should.equal("201");
        res.body.should.have.property('data');
        done();
      });
  });


});