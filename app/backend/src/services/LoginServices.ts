import UsersModel from '../database/models/UsersModel';

export default class LoginService {
  constructor(private _usersModel = UsersModel) {}

  public async findByEmail(email: string): Promise<UsersModel | null> {
    const result = await this._usersModel.findOne({ where: { email } });
    return result;
  }

  public async findById(id: number): Promise<UsersModel> {
    const result = await this._usersModel.findOne({ where: { id } });
    return result as UsersModel;
  }
}
