import { allMatches, matchesEnded, matchesInProgress } from './mocks/matchesMock'
import { EMPTY_FIELDS, INVALID_TYPE } from '../helpers/responsesMessages';
import * as chai from 'chai';
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

  describe('POST /matches', async () => {
    it('sholdn\'t be possible to save a match with out a homeTeam', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: EMPTY_FIELDS});
    });

    it('sholdn\'t be possible to save a match with out the homeTeamGoals', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 8,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: EMPTY_FIELDS});
    });

    it('sholdn\'t be possible to save a match with out a awayTeam', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: EMPTY_FIELDS});
    });

    it('sholdn\'t be possible to save a match with out the awayTeamGoals', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({message: EMPTY_FIELDS});
    });

    it('sholdn\'t be possible to save a match with invalid homeTeam input type', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: '16',
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: INVALID_TYPE});
    });

    it('sholdn\'t be possible to save a match with invalid awayTeam input type', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: '1',
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: INVALID_TYPE});
    });

    it('sholdn\'t be possible to save a match with invalid homeTeamGoals input type', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: '2',
        awayTeamGoals: 2,
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: INVALID_TYPE});
    });

    it('sholdn\'t be possible to save a match with invalid awayTeamGoals input type', async () => {
      const loginBody = { email: "admin@admin.com", password: "secret_admin" };
      const { body: { token } } = await chai.request(app).post('/login').send(loginBody);
      const matchesBody = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: '2',
      };
      const response = await chai.request(app)
        .post('/matches')
        .send(matchesBody)
        .set('authorization', token);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({message: INVALID_TYPE});
    });

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
});
