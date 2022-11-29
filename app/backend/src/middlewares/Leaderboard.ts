import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import SortType from '../types/SortType';

export default class Leaderboard {
  private _matches: MatchesModel[];
  private _sortType: SortType;

  constructor(private matches: MatchesModel[], sortType: SortType) {
    this._matches = matches;
    this._sortType = sortType;
  }

  private _getDraws(): number {
    return this._matches.filter((match) =>
      match.homeTeamGoals === match.awayTeamGoals).length;
  }

  private _teamOneVictories(): number {
    return this._matches.filter((match) =>
      match.homeTeamGoals > match.awayTeamGoals).length;
  }

  private _teamTwoVictories(): number {
    return this._matches.filter((match) =>
      match.homeTeamGoals < match.awayTeamGoals).length;
  }

  private _teamOneGoals(): number {
    return this._matches.map((match) => match.homeTeamGoals)
      .reduce((acc, curr) => acc + curr);
  }

  private _teamTwoGoals(): number {
    return this._matches.map((match) => match.awayTeamGoals)
      .reduce((acc, curr) => acc + curr);
  }

  private static _calculateTotalPoints(victories: number, draws: number): number {
    return victories * 3 + draws;
  }

  private static _calculateEfficiency(totalPoints: number, totalGames: number): string {
    const efficiency = (((totalPoints / 3) / totalGames) * 100);
    return efficiency.toFixed(2);
  }

  private _homeTeamLeaderboard(): ILeaderboard {
    const totalVictories = this._teamOneVictories();
    const totalLosses = this._teamTwoVictories();
    const goalsFavor = this._teamOneGoals();
    const goalsOwn = this._teamTwoGoals();
    const totalDraws = this._getDraws();
    const totalPoints = Leaderboard._calculateTotalPoints(totalVictories, totalDraws);

    return {
      name: this._matches[0].dataValues.teamHome.teamName,
      totalPoints,
      totalGames: this._matches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Leaderboard._calculateEfficiency(totalPoints, this._matches.length),
    };
  }

  private _awayTeamLeaderboard(): ILeaderboard {
    const totalVictories = this._teamTwoVictories();
    const totalLosses = this._teamOneVictories();
    const goalsFavor = this._teamTwoGoals();
    const goalsOwn = this._teamOneGoals();
    const totalDraws = this._getDraws();
    const totalPoints = Leaderboard._calculateTotalPoints(totalVictories, totalDraws);

    return {
      name: this._matches[0].dataValues.teamAway.teamName,
      totalPoints,
      totalGames: this._matches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Leaderboard._calculateEfficiency(totalPoints, this._matches.length),
    };
  }

  get leaderboard(): ILeaderboard {
    if (this._sortType === 'teamHome') return this._homeTeamLeaderboard();
    return this._awayTeamLeaderboard();
  }
}
