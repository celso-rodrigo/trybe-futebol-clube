import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get(
  '/',
  (req, res) => leaderboardController.getGlobalLeaderboards(req, res),
);

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboardController.getHomeLeaderboards(req, res),
);

leaderboardRouter.get(
  '/away',
  (req, res) => leaderboardController.getAwayLeaderboards(req, res),
);

export default leaderboardRouter;
