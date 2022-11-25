import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import Leaderboard from '../middlewares/Leaderboard';

export default class LeaderboardService {
  constructor(private _matchesModel = MatchesModel) {}

  private static _sort(leaderboards: ILeaderboard[]): ILeaderboard[] {
    return leaderboards.sort((a, b) =>
      (b.totalVictories - a.totalVictories)
      || (b.totalPoints - a.totalPoints)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsOwn - a.goalsOwn));
  }

  private static _getAllTeams(allMatches: MatchesModel[]): string[] {
    return allMatches.map((match) => match.dataValues.teamHome.teamName)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  private static _sortByTeam(allMatches: MatchesModel[], teams: string[]): MatchesModel[][] {
    return teams.map((team) => allMatches
      .filter((match) => match.dataValues.teamHome.teamName === team));
  }

  private async _getAllMatches(): Promise<MatchesModel[][]> {
    const allMatches = await this._matchesModel.findAll({
      where: { inProgress: false },
      include: { all: true },
    });
    const allTeams = LeaderboardService._getAllTeams(allMatches);
    const matchesSortedByTeam = LeaderboardService._sortByTeam(allMatches, allTeams);
    return matchesSortedByTeam;
  }

  public async getHomeMatches(): Promise<ILeaderboard[]> {
    const allMatches = await this._getAllMatches();
    const homeMatches = allMatches.map((team) =>
      new Leaderboard(team, team[0].dataValues.teamHome.teamName).leaderboard);
    const orderedMatches = LeaderboardService._sort(homeMatches);
    return orderedMatches;
  }
}
