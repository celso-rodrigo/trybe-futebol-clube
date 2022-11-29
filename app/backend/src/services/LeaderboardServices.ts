import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import SortType from '../types/SortType';
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

  private static _sortByTeam(
    allMatches: MatchesModel[],
    teams: string[],
    sortType: string,
  ): MatchesModel[][] {
    return teams.map((team) => allMatches
      .filter((match) => match.dataValues[sortType].teamName === team));
  }

  private async _getAllMatches(sortType: SortType): Promise<MatchesModel[][]> {
    const allMatches = await this._matchesModel.findAll({
      where: { inProgress: false },
      include: { all: true },
    });
    const allTeams = LeaderboardService._getAllTeams(allMatches);
    const matchesSortedByTeam = LeaderboardService._sortByTeam(allMatches, allTeams, sortType);
    return matchesSortedByTeam;
  }

  private static _concatLeaderboard(hTeam: ILeaderboard, aTeam: ILeaderboard): ILeaderboard {
    const totalPoints = hTeam.totalPoints + aTeam.totalPoints;
    const totalGames = hTeam.totalGames + aTeam.totalGames;
    const efficiency = (((totalPoints / 3) / totalGames) * 100).toFixed(2);
    return {
      name: hTeam.name,
      totalPoints,
      totalGames,
      totalVictories: hTeam.totalVictories + aTeam.totalVictories,
      totalDraws: hTeam.totalDraws + aTeam.totalDraws,
      totalLosses: hTeam.totalLosses + aTeam.totalLosses,
      goalsFavor: hTeam.goalsFavor + aTeam.goalsFavor,
      goalsOwn: hTeam.goalsOwn + aTeam.goalsOwn,
      goalsBalance: hTeam.goalsBalance + aTeam.goalsBalance,
      efficiency,
    };
  }

  public async getMatches(sortType: SortType): Promise<ILeaderboard[]> {
    const allMatches = await this._getAllMatches(sortType);
    const matches = allMatches.map((team) => (
      new Leaderboard(team, sortType).leaderboard
    ));
    const orderedMatches = LeaderboardService._sort(matches);
    return orderedMatches;
  }

  public async getGlobalMatches(): Promise<ILeaderboard[]> {
    const homeLeaderboard = await this.getMatches('teamHome');
    const awayLeaderboard = await this.getMatches('teamAway');
    const globalLeaderboard = homeLeaderboard.map((hMatch) => {
      const otherMatch = awayLeaderboard.filter((aMatch) => aMatch.name === hMatch.name)[0];
      return LeaderboardService._concatLeaderboard(hMatch, otherMatch);
    });
    const sortedLeaderboard = LeaderboardService._sort(globalLeaderboard);
    return sortedLeaderboard;
  }
}
