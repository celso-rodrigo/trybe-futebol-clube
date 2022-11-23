import iQueryResult from '../interfaces/iQueryResult';
import UsersModel from '../database/models/UsersModel';
import Bcrypt from '../middlewares/Bcrypt';
import JwtToken from '../middlewares/JwtToken';

export default class LoginService {
  private _noUserFound = { error: true, response: { status: 500, message: 'wip' } };

  constructor(private _usersModel = UsersModel) {}

  public async findUser(email: string, password: string): Promise<iQueryResult> {
    const result = await this._usersModel.findOne({ where: { email } });
    if (result === null) return this._noUserFound;
    if (!Bcrypt.match(password, result.password)) return this._noUserFound;
    return { error: false, response: { status: 200, message: JwtToken.generateToke(result.id) } };
  }
}
