const path = require('path');
const Factory = require('./Factory');

const appDir = path.dirname(require.main.filename);

class FactoryRegister {
  static register(configs) {
    Object.keys(configs).forEach((className) => {
      const classFactoryPath = path.join(appDir, configs[className]);
      /* eslint-disable */
      const classFactory = require(classFactoryPath);
      Factory.register(className, classFactory);
    });
  }
}

module.exports = FactoryRegister;
