import * as res from '../helpers/responsesMessages';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import JwtToken from '../middlewares/JwtToken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests of /login', () => {
  describe('POST /login', () => {
    it('should be possible to login and return a token', async () => {
      const body = { email: "admin@admin.com", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });

    it('shouldn\'t be possible to login with an empty email', async () => {
      const body = { email: "", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(res.EMPTY_FIELDS);
    });

    it('shouldn\'t be possible to login with an empty password', async () => {
      const body = { email: "admin@admin.com", password: "" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(res.EMPTY_FIELDS);
    });

    it('shouldn\'t be possible to login with a invalid email', async () => {
      const body = { email: "invalid", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(res.INVALID_FIELDS);
    });

    it('shouldn\'t be possible to login with a invalid password', async () => {
      const body = { email: "admin@admin.com", password: "short" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(res.INVALID_FIELDS);
    });
  });

  describe('GET /login/validate', () => {
    it('should return the correct role and status 200', async () => {
      const body = { email: "admin@admin.com", password: "secret_admin" };
      const login = await chai.request(app).post('/login').send(body);
      const response = await chai.request(app).get('/login/validate')
        .set('authorization', login.body.token)
      expect(response.status).to.be.equal(200);
      expect(response.body.role).to.be.equal('admin');
    });

    it('shouldn\'t be able to login with out a token', async () => {
      const response = await chai.request(app).get('/login/validate');
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });

    it('shouldn\'t be able to login with a invalid token', async () => {
      const response = await chai.request(app).get('/login/validate')
        .set('authorization', 'InvalidToken');
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Invalid token');
    });
  });

});
