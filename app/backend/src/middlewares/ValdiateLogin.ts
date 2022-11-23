import { NextFunction, Request, Response } from 'express';
import { EMPTY_FIELDS, INVALID_FIELDS } from '../helpers/responsesMessages';

export default class ValidateLogin {
  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email) return res.status(400).json(EMPTY_FIELDS);
    if (!pattern.test(email)) return res.status(401).json(INVALID_FIELDS);
    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;
    if (!password) return res.status(400).json(EMPTY_FIELDS);
    if (password.length <= 6) return res.status(401).json(INVALID_FIELDS);
    next();
  }
}
