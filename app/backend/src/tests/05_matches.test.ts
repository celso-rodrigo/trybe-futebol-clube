import { allMatches, matchesEnded, matchesInProgress } from './mocks/matchesMock'
import { INVALID_MATCH } from '../helpers/responsesMessages';
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Tests of /matches', () => {
  describe('GET /matches', () => {
    it('should list all matches', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allMatches);
    });
  });

  describe('GET /matches?inProgress', () => {
    it('should list all matches in progress', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProgress);
    });

    it('should list all ended matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesEnded);
    });
  });

  describe('POST /matches', () => {
    it('sholdn\'t be possible to save a match with equal teams', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'});
    });

    it('sholdn\'t be possible to save a match with a invalid team', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 999,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({message: 'There is no team with such id!'});
    });

    it('should save a match', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({...matchesBody, id: 49, inProgress: true});
    });
  });

  describe('PATCH /matches/:id', () => {
    it('Should be possible to update a match score', async () => {
      const body = { homeTeamGoals: 1, awayTeamGoals: 2 }
      const response = await chai.request(app).patch('/matches/48').send(body);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Match updated' });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    it('Should be possible to finish a match', async () => {
      const response = await chai.request(app).patch('/matches/1/finish');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });

    it('Shouldn\'t be possible to finish a match with a invalid id', async () => {
      const response = await chai.request(app).patch('/matches/999/finish');
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: INVALID_MATCH });
    });

    it('Shouldn\'t be possible to finish a match with a invalid id type', async () => {
      const response = await chai.request(app).patch('/matches/string/finish');
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: INVALID_MATCH });
    });
  });
});
