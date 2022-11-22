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

TeamsModel.belongsTo(MatchesModel, { foreignKey: 'home_teams', as: 'homeTeams' });
TeamsModel.belongsTo(MatchesModel, { foreignKey: 'away_teams', as: 'awayTea' });

export default MatchesModel;
