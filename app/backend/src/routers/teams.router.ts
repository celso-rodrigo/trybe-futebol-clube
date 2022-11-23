import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();

const teamsControllet = new TeamsController();

teamsRouter.get(
  '/',
  (req, res) => teamsControllet.getTeams(req, res),
);

export default teamsRouter;
