import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email) return res.status(500).json({ message: 'undefined' });
    if (!pattern.test(email)) return res.status(500).json({ message: 'invalid' });
    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;
    if (!password) return res.status(500).json({ message: 'undefined' });
    if (password.length <= 6) return res.status(500).json({ message: 'short' });
    next();
  }
}
