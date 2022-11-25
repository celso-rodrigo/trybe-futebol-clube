import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class JwtToken {
  static generateToke(userId: number): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
      const userInfo = jwt.verify(authorization, process.env.JWT_SECRET as string);
      req.body.user = userInfo;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
