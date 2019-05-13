import webservice from './functions';
import WS from './constants';
import { TOUR_BARCODES } from './shapes';

describe('Webservices', () => {
  it('Import correctly', () => {
    expect(1).toEqual(1);
  });

  // describe('Given an incorrect URL', () => {
  //   it('Should throw an error', () => {
  //     webservice({ url: 'http://virgule.xyz/get', params: {} })
  //       .then(value => {
  //         expect(value).toBeNull();
  //       })
  //       .catch(err => {
  //         console.debug(err);
  //         expect(err).toBeNotNull();
  //       });
  //   });
  // });

  describe('Given a correct URL', () => {
    // it('Should throw an error for bad key', () => {
    //   webservice({ url: WS.URL.TOUR, params: { key: '001', num: TOUR_BARCODES[0] } })
    //     .then(value => {
    //       expect(1).toBe(0);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       expect(err).toBeNotNull();
    //     });
    // });
    it('Should get value for good key', () => {
      webservice({ url: WS.URL.TOUR, params: { key: WS.KEY, num: TOUR_BARCODES[0] } })
        .then(value => {
          console.log(value);
          expect(value).toBeNotNull();
        })
        .catch(err => {
          expect(1).toBe(0);
        });
    });
  });
});
