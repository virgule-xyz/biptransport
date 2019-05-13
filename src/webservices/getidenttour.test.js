import getIdentTour from './getidenttour';

describe('Tour', () => {
  it('Should throw an error if num is 0', done => {
    getIdentTour(0)
      .then(value => {
        expect(0).toBe(1);
        done();
      })
      .catch(err => {
        expect(err).toExist();
        expect(err.error).toExist();
        done();
      });
  });
});
