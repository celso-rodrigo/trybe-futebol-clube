import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _teamsServices = new TeamsService()) {}

  public async getTeams(_req: Request, res: Response): Promise<void> {
    const results = await this._teamsServices.getTeams();
    res.status(200).json(results);
  }

  public async getTeamById(req: Request, res: Response): Promise<void | Response> {
    const id = Number(req.params.id);
    const results = await this._teamsServices.getTeamById(id);
    if (results === null) return res.status(404).json({ message: 'No team Found' });
    res.status(200).json(results);
  }
}
