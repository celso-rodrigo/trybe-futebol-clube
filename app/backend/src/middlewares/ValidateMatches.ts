import { Request, Response, NextFunction } from 'express';
import { EMPTY_FIELDS, INVALID_TYPE } from '../helpers/responsesMessages';

export default class ValidateMatches {
  static validateHomeTeam(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeam, homeTeamGoals } = req.body;
    if (!homeTeam) return res.status(400).json({ message: EMPTY_FIELDS });
    if (typeof homeTeam !== 'number') return res.status(401).json({ message: INVALID_TYPE });
    if (!homeTeamGoals) return res.status(400).json({ message: EMPTY_FIELDS });
    if (typeof homeTeamGoals !== 'number') return res.status(401).json({ message: INVALID_TYPE });
    next();
  }

  static validateAwayTeam(req: Request, res: Response, next: NextFunction): Response | void {
    const { awayTeam, awayTeamGoals } = req.body;
    if (!awayTeam) return res.status(400).json({ message: EMPTY_FIELDS });
    if (typeof awayTeam !== 'number') return res.status(401).json({ message: INVALID_TYPE });
    if (!awayTeamGoals) return res.status(400).json({ message: EMPTY_FIELDS });
    if (typeof awayTeamGoals !== 'number') return res.status(401).json({ message: INVALID_TYPE });

    next();
  }
}
