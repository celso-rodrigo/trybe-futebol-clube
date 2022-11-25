import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesServices = new MatchesService()) {}

  private async _getAllMatches(req: Request, res: Response): Promise<void> {
    const results = await this._matchesServices.getMatches();
    res.status(200).json(results);
  }

  private async _getMatchesByProgress(req: Request, res: Response): Promise<void> {
    const progressType = req.query.inProgress === 'true';
    const results = await this._matchesServices.getMatchesByProgress(progressType);
    res.status(200).json(results);
  }

  public async handleGetMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      this._getAllMatches(req, res);
    } else {
      this._getMatchesByProgress(req, res);
    }
  }
}
