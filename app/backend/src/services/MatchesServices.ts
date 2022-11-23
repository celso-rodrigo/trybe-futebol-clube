import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

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
}
