import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import App from '../app';

import leaderboardMock from './mocks/leaderboardMock'

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Tests of /leaderboard', () => {
  describe('GET /leaderboard/home', () => {
    it('should return all finished matches sorted and in the right format', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderboardMock);
    });
  });
});
