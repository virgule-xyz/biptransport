const checkBarcode = ({ codebar, ws, setContextState }) => {
  return new Promise((resolve, reject) => {
    const goodcode = ws === 'car' ? 'eb085tn' : '123456';
    if (codebar === goodcode) {
      setContextState(prevState => {
        // FIXME: Use the API with the mapper from the API to this interface
        const newState =
          ws === 'car'
            ? {
                ...prevState,
                brand: 'Renault',
                model: 'Zoé',
                license: 'EB085TN',
                comment: '',
              }
            : {
                ...prevState,
                gsmNumber: '0695144942',
                code: '1',
                firstname: 'Pierre',
                lastname: 'Canthelou',
              };

        return newState;
      });
      resolve();
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Mauvais code');
    }
  });
};

export default checkBarcode;
