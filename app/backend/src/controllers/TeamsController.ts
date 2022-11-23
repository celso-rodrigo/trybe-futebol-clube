// import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _teamsServices = new TeamsService()) {}
}
