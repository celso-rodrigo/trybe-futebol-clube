import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatchesBody from '../interfaces/IMatchesBody';

export default class MatchesServices {
  constructor(private _matchesModel = MatchesModel, private _teamsModel = TeamsModel) {}

  public async getMatches(): Promise<MatchesModel[]> {
    const result = await this._matchesModel.findAll({
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return result;
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<MatchesModel[]> {
    const result = await this._matchesModel.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: { exclude: ['id'] } },
    });
    return result;
  }

  public async checkInvalidId(id: string): Promise<boolean> {
    const result = await this._matchesModel.findByPk(id);
    return result === null;
  }

  public async saveMatch(match: IMatchesBody): Promise<MatchesModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const result = await this._matchesModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return result;
  }

  public async finishMatch(id: string): Promise<void> {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this._matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
