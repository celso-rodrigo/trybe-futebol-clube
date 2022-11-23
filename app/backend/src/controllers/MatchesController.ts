// import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesServices = new MatchesService()) {}
}
