import * as jwt from 'jsonwebtoken';

export default class JwtToken {
  static generateToke(userId: number): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
  }
}
