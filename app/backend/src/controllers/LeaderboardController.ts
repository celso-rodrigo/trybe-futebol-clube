import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

export default class LoginController {
  constructor(private _leaderboardServices = new LeaderboardService()) {}

  public async getHomeLeaderboards(req: Request, res: Response) {
    const results = await this._leaderboardServices.getHomeMatches();
    res.status(200).json(results);
  }
}
