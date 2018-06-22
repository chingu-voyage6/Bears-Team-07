import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Users', () => {
  it('should get all users', () =>
    request(Server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
    );
      /*.then(r => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('array')
          .of.length(2);
      }));*/

  it('should add a new users', () =>
    request(Server)
      .post('/api/v1/users')
      .send({ name: 'test', surname: 'test1',
        email: 'test@test.test', password: 'test'})
      .expect('Content-Type', /json/)
    );
      /*.then(r => {
       expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));*/

  it('should get an users by id', () =>
    request(Server)
      .get('/api/v1/users/0')
      .expect('Content-Type', /json/)
    );
      /*.then(r => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));*/
});
