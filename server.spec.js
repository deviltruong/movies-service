/* eslint-env mocha */
const { expect } = require('chai');
const server = require('./server');

describe('Server', () => {
  it('should require a port to start', (done) => {
    server.start({ repo: {} })
      .catch((err) => {
        expect(err.message).to.be.a('string').that.match(/port/);
        done();
      });
  });
});
