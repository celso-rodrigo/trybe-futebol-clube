import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesServices = new MatchesService()) {}

  public async getMatches(req: Request, res: Response): Promise<void> {
    const results = await this._matchesServices.getMatches();
    res.status(200).json(results);
  }
}
