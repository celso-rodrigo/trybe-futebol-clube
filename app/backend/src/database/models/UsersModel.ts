import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersModel.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  freezeTableName: true,
  timestamps: false,
});

export default UsersModel;
