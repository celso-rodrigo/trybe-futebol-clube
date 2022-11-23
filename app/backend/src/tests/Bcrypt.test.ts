import Bcrypt from './../middlewares/Bcrypt';
import * as sinon from 'sinon';
import * as chai from 'chai';

const { expect } = chai;

describe('Tests of the class Bcrypt', () => {
  it('Should return true when the password match the hash', () => {
    const password = 'secret_admin';
    const incodedPw = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';
    const result = Bcrypt.match(password, incodedPw);
    expect(result).to.be.equal(true);
  });

  it('Should return false when the password don\'t match the hash', () => {
    const password = 'secret_admin';
    const incodedPw = 'shouldNotWork';
    const result = Bcrypt.match(password, incodedPw);
    expect(result).to.be.equal(false);
  });
});