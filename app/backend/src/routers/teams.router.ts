import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get(
  '/',
  (req, res) => teamsController.getTeams(req, res),
);

teamsRouter.get(
  '/:id',
  (req, res) => teamsController.getTeamById(req, res),
);

export default teamsRouter;
