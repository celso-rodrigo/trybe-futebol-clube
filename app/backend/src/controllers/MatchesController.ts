import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  private _equalTeams = { message: 'It is not possible to create a match with two equal teams' };
  private _invalidMatch = { message: 'There is no team with such id!' };

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

  private async _saveMatch(req: Request, res: Response): Promise<void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { id, inProgress } = await this._matchesServices.saveMatch(req.body);
    res.status(201).json({ id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress });
  }

  private async _finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    this._matchesServices.finishMatch(id);
    res.status(200).json({ message: 'Finished' });
  }

  public async handleSaveMatch(req: Request, res: Response): Promise<void | Response> {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) return res.status(422).json(this._equalTeams);
    const invalidHomeTeam = await this._matchesServices.checkInvalidId(homeTeam);
    const invalidAwayTeam = await this._matchesServices.checkInvalidId(awayTeam);
    if (invalidHomeTeam || invalidAwayTeam) return res.status(404).json(this._invalidMatch);
    this._saveMatch(req, res);
  }

  public async handleGetMatches(req: Request, res: Response): Promise<void | Response> {
    const { inProgress } = req.query;
    if (inProgress === undefined) return this._getAllMatches(req, res);
    this._getMatchesByProgress(req, res);
  }

  public async handleFinishMatch(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    if (!/[0-9]/.test(id)) return res.status(404).json(this._invalidMatch);
    const invalidMatch = await this._matchesServices.checkInvalidId(id);
    if (invalidMatch) return res.status(404).json(this._invalidMatch);
    this._finishMatch(req, res);
  }

  public async updateMatch(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchesServices.updateMatch(id, homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Match updated' });
  }
}
