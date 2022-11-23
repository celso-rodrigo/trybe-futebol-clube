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
    it('should be able to login and return a token', async () => {
      const body = { email: "admin@admin.com", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    })
  });
});
