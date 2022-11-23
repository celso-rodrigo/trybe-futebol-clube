import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _teamsServices = new TeamsService()) {}

  public async getTeams(_req: Request, res: Response): Promise<void> {
    const results = await this._teamsServices.getTeams();
    res.status(200).json(results);
  }

  public async getTeamById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const results = await this._teamsServices.getTeamById(id);
    const { error, response: { status, message } } = results;
    if (error) {
      res.status(status).json({ message });
    } else {
      res.status(status).json(message);
    }
  }
}
