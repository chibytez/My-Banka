import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../../app';

chai.use(chaiHttp);
chai.should()

describe('USER SIGNUP API ENDPOINT', () => {
  it('should signUp a user account on /signUp/ POST ', (done) => {
    const user = {
      firstName: 'Becky',
      lastName: 'Uwah',
      email: 'beckyuwah@gmail.com',
      password: 'chibyke',
      phoneNumber: '09065434565',
      type: 'client',
      isAdmin: false,
        };
        chai.request(app)
          .post('/api/v1/auth/signUp')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('user');
            res.header.should.have.property('x-access-token');
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
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.status.should.equal("200");
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        // res.body.data.should.have.property('user');
        // res.header.should.have.property('x-auth-token');
        done();
      });
  });

  it('should not login user', (done) => {
    const user = {
      email: 'beckyuwah@gmail.com',
      password: 'chibytez',
    };
    chai.request(app)
    .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.have.property('error');
        done();
      });
  });

});