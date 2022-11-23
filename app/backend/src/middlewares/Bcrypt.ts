import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  static match(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
