const setGsmNumber = ({ code, gsmNumber }) => {
  return new Promise((resolve, reject) => {
    if (code === '1' && gsmNumber.length >= 10) {
      resolve();
    } else reject();
  });
};

export default setGsmNumber;
