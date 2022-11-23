import JwtToken from '../middlewares/JwtToken';
import * as sinon from 'sinon';
import * as chai from 'chai';

const { expect } = chai;

describe('Tests of the class JwtToken', () => {
  it('Should generate a new token based on time and params', async () => {
    const firstToken = JwtToken.generateToke(1);
    await new Promise(f => setTimeout(f, 2000));
    const secondToken = JwtToken.generateToke(1);
    const thirdToken = JwtToken.generateToke(2);

    expect(firstToken).not.to.be.equal(secondToken);
    expect(secondToken).not.to.be.equal(thirdToken);
  });
});