import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get(
  '/',
  (req, res) => matchesController.handleGetMatches(req, res),
);

export default matchesRouter;