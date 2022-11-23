import * as res from '../helpers/responsesMessages';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import teamsMock from './mocks/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests of /teams', () => {
  describe('GET /teams', () => {
    it('should be possible to list all the teams', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock);
    });
  });

  describe('GET /teams/:id', () => {
    it('should be possible return the team based on id', async () => {
      const response = await chai.request(app).get('/teams/5');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock[4]);
    });

    it('should return not found when a invalid id is sent', async () => {
      const response = await chai.request(app).get('/teams/99');
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('No team Found');
    });
  });
});
