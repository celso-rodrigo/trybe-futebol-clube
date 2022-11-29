import { Router } from 'express';
import JwtToken from '../middlewares/JwtToken';
import MatchesController from '../controllers/MatchesController';
import ValidateMatches from '../middlewares/ValidateMatches';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (req, res) => matchesController.handleGetMatches(req, res),
);

matchesRouter.post(
  '/',
  (req, res, next) => JwtToken.verifyToken(req, res, next),
  (req, res, next) => ValidateMatches.validateHomeTeam(req, res, next),
  (req, res, next) => ValidateMatches.validateAwayTeam(req, res, next),
  (req, res) => matchesController.handleSaveMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  (req, res) => matchesController.updateMatch(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  (req, res) => matchesController.handleFinishMatch(req, res),
);

export default matchesRouter;
