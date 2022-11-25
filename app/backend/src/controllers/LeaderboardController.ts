// import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

export default class LoginController {
  constructor(private _leaderboardServices = new LeaderboardService()) {}
}
