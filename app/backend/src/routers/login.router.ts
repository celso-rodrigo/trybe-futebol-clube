import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import ValidateLogin from '../middlewares/ValdiateLogin';
import JwtToken from '../middlewares/JwtToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  (req, res, next) => ValidateLogin.validateEmail(req, res, next),
  (req, res, next) => ValidateLogin.validatePassword(req, res, next),
  (req, res) => loginController.login(req, res),
);

loginRouter.get(
  '/validate/',
  (req, res, next) => JwtToken.verifyToken(req, res, next),
  (req, res) => loginController.getRole(req, res),
);

export default loginRouter;
