import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import ValidateLogin from '../middlewares/ValdiateLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  (req, res, next) => ValidateLogin.validateEmail(req, res, next),
  (req, res, next) => ValidateLogin.validatePassword(req, res, next),
  (req, res) => loginController.login(req, res),
);

export default loginRouter;
