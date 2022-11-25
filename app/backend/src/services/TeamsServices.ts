import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  constructor(private _teamsModel = TeamsModel) {}

  public async getTeams(): Promise<TeamsModel[]> {
    return this._teamsModel.findAll();
  }

  public async getTeamById(id: number): Promise<TeamsModel | null> {
    const result = await this._teamsModel.findOne({ where: { id } });
    return result;
  }
}
