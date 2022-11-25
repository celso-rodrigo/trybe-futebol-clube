import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboardController.getHomeLeaderboards(req, res),
);

export default leaderboardRouter;
