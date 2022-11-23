import matchesMock from './mocks/matchesMock'
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests of /matches', () => {
  describe('GET /matches', () => {
    it('should list all matches', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesMock);
    });
  });
});
