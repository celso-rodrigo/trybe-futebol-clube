import MatchesModel from '../database/models/MatchesModel';

export default class LeaderboardService {
  constructor(private _matchesModel = MatchesModel) {}
}
