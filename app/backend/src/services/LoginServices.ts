import { INVALID_LOGIN } from '../helpers/responsesMessages';
import iQueryResult from '../interfaces/iQueryResult';
import UsersModel from '../database/models/UsersModel';
import Bcrypt from '../middlewares/Bcrypt';
import JwtToken from '../middlewares/JwtToken';

export default class LoginService {
  private _noUserFound = { error: true, response: { status: 401, message: INVALID_LOGIN } };

  constructor(private _usersModel = UsersModel) {}

  public async findUser(email: string, password: string): Promise<iQueryResult> {
    const result = await this._usersModel.findOne({ where: { email } });
    if (result === null) return this._noUserFound;
    if (!Bcrypt.match(password, result.password)) return this._noUserFound;
    return { error: false, response: { status: 200, message: JwtToken.generateToke(result.id) } };
  }

  public async findById(id: number): Promise<iQueryResult> {
    const result = await this._usersModel.findOne({ where: { id } });
    if (result === null) return this._noUserFound;
    return { error: false, response: { status: 200, message: result.role } };
  }
}
