import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcryptjs';
import app from '../../app';
import db from '../model/database';
chai.use(chaiHttp);

let token;

async function createAdmin() {
    const query = `INSERT INTO users(firstName, lastname, email, password, admin,type)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING email, firstname, lastname, id`;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('chibyke', salt);
    const values = ['Aniaku', 'Chibuike', 'chibuikekenneth@gmail.com', hash, true, 'staff'];
    return db.query(query, values);
  }

  describe('tests for Admin controller', () => {
    before(async () => {
        await createAdmin();
      });
      it('should get login and return admin token', (done) => {
        const user = {
          email: 'chibuikekenneth@gmail.com',
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
      describe('/POST admin user', () => {
        it('should create a new user', (done) => {
            const user = {
              firstName: 'Chidi',
              lastName: 'Chiwetalu',
              email: 'chidichiwetalu@gmail.com',
              password: 'chibyke',
              type: 'staff',
              admin: true,
            };
            chai.request(app)
            .post('/api/v1/auth/makeAdmin')
            .set('token', token)
            .send(user)
            .end((error, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('token');
                done();
              });
        });
    })    
      
    it('should not create a new user when the firstname is not provided', (done) => {
        const user = {
          lastName: 'chibyke',
          email: 'becky@gmail.com',
          password: '123def',
        };
        chai.request(app)
          .post('/api/v1/auth/makeAdmin')
          .set('token', token)
          .send(user)
          .end((error, res) => {
            expect(res.status).to.equal(400)
            done();
          });
      });
    
      it('should not create a new user when the lastname is not provided', (done) => {
        const user = {
          firstName: 'chibuike',
          email: 'aniaku@gmail.com',
          password: 'chibyke',
        };
        chai.request(app)
        .post('/api/v1/auth/makeAdmin')
        .set('token', token)
        .send(user)
        .end((error, res) => {
            expect(res.status).to.equal(400);
          });
          done();
      });
  })