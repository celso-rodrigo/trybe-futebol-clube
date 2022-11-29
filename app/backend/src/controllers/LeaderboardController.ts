import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

export default class LoginController {
  constructor(private _leaderboardServices = new LeaderboardService()) {}

  public async getHomeLeaderboards(req: Request, res: Response) {
    const results = await this._leaderboardServices.getMatches('teamHome');
    res.status(200).json(results);
  }

  public async getAwayLeaderboards(req: Request, res: Response) {
    const results = await this._leaderboardServices.getMatches('teamAway');
    res.status(200).json(results);
  }

  public async getGlobalLeaderboards(req: Request, res: Response) {
    const results = await this._leaderboardServices.getGlobalMatches();
    res.status(200).json(results);
  }
}
