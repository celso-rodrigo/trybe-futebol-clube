import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamsModel from './TeamsModel';
import db from '.';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  homeTeam: { type: INTEGER },
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  freezeTableName: true,
  timestamps: false,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchesModel;
