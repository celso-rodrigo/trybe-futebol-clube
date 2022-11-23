import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  static incode(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static match(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
