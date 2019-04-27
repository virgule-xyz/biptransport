const isFakeFilename = filename => /^blah.*/.test(filename);

const mockFunctions = {
  play: jest.fn(cb => {
    console.log('*** Playing sound! ***');
    cb && cb(isFakeFilename(this.filename) ? false : true);
  }),
  setCategory: jest.fn(),
  getDuration: jest.fn(() => 100),
  getNumberOfChannels: jest.fn(() => 8),
};

const Sound = function(filename, blah2, cb) {
  this.play = mockFunctions.play.bind(this);
  this.filename = filename;
  const savedFilename = filename;
  setTimeout(() => {
    if (isFakeFilename(savedFilename)) {
      cb && cb(new Error('File does not exist! (mocked condition)'));
    } else {
      cb && cb();
    }
  });
};

Sound.prototype.play = mockFunctions.play.bind(Sound.prototype);
Sound.prototype.getDuration = mockFunctions.getDuration;
Sound.prototype.getNumberOfChannels = mockFunctions.getNumberOfChannels;

Sound.setCategory = mockFunctions.setCategory;

export default Sound;
export { mockFunctions };
