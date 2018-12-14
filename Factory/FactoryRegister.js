const path = require('path');
const Factory = require('./Factory');

const appDir = path.dirname(require.main.filename);

class FactoryRegister {
  static register(configs) {
    Object.keys(configs).forEach((className) => {
      let classFactory = null;
      if (typeof configs[className] === 'string') {
        const classFactoryPath = path.join(appDir, configs[className]);
        /* eslint-disable */
        classFactory = require(classFactoryPath);
      } else if (typeof configs[className] === 'object' || typeof configs[className] === 'function') {
        classFactory = configs[className];
      }
      Factory.register(className, classFactory);
    });
  }
}

module.exports = FactoryRegister;
