import { Request, Response } from 'express';
import LoginService from '../services/LoginServices';

export default class LoginController {
  constructor(private _loginServices = new LoginService()) {}

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const results = await this._loginServices.findUser(email, password);
    const { error, response: { status, message } } = results;
    if (error) {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ token: message });
    }
  }

  public async getRole(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;
    const results = await this._loginServices.findById(userId as number);
    const { error, response: { status, message } } = results;
    if (error) {
      res.status(status).json({ message });
    } else {
      res.status(status).json({ role: message });
    }
  }
}
