import iQueryResult from '../interfaces/iQueryResult';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  private _noTeamFound = { error: true, response: { status: 404, message: 'No team Found' } };

  constructor(private _teamsModel = TeamsModel) {}

  public async getTeams(): Promise<TeamsModel[]> {
    return this._teamsModel.findAll();
  }

  public async getTeamById(id: number): Promise<iQueryResult> {
    const result = await this._teamsModel.findOne({ where: { id } });
    if (result === null) return this._noTeamFound;
    return { error: false, response: { status: 200, message: result } };
  }
}
