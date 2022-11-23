import * as res from '../helpers/responsesMessages';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

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
});
