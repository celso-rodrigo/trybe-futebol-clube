import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';

export default class Leaderboard {
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: string;
  private _matches: MatchesModel[];

  constructor(private matches: MatchesModel[], name: string) {
    this._name = name;
    this._totalPoints = 0;
    this._totalGames = matches.length;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = '0';
    this._matches = matches;

    this._calculateWinRate();
    this._calculateGoals();
    this._calculateTotalPoints();
    this._calculateEfficiency();
  }

  private _calculateWinRate(): void {
    this._matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) this._totalVictories += 1;
      if (match.awayTeamGoals > match.homeTeamGoals) this._totalLosses += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) this._totalDraws += 1;
    });
  }

  private _calculateGoals(): void {
    this._matches.forEach((match) => {
      this._goalsFavor += match.homeTeamGoals;
      this._goalsOwn += match.awayTeamGoals;
    });
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private _calculateTotalPoints(): void {
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;
  }

  private _calculateEfficiency(): void {
    const efficiency = (((this._totalPoints / 3) / this._totalGames) * 100);
    this._efficiency = efficiency.toFixed(2);
  }

  get leaderboard(): ILeaderboard {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
