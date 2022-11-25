import { Request, Response } from 'express';
import { INVALID_LOGIN } from '../helpers/responsesMessages';
import Bcrypt from '../middlewares/Bcrypt';
import JwtToken from '../middlewares/JwtToken';
import LoginService from '../services/LoginServices';

export default class LoginController {
  constructor(private _loginServices = new LoginService()) {}

  public async login(req: Request, res: Response): Promise<void | Response> {
    const { email, password } = req.body;
    const user = await this._loginServices.findByEmail(email);
    if (user === null) return res.status(401).json({ message: INVALID_LOGIN });
    const validPassword = Bcrypt.match(password, user.password);
    if (!validPassword) return res.status(401).json({ message: INVALID_LOGIN });
    res.status(200).json({ token: JwtToken.generateToke(user.id) });
  }

  public async getRole(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;
    const results = await this._loginServices.findById(Number(userId));
    res.status(200).json({ role: results.role });
  }
}
