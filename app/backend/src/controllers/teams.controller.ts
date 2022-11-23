// import { Request, Response } from 'express';
import TeamsService from '../services/login.services';

export default class TeamsController {
  constructor(private _teamsServices = new TeamsService()) {}
}
