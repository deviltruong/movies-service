process.env.NODE_ENV = 'development';

const Server = require('./Server');
const { Config } = require('./config');
const mongoDB = require('./mongodb');
const { FactoryRegister } = require('./Factory');
const logger = require('./config/logger');

const configs = new Config({});

logger.info('Movies Service');
logger.info('Connecting to movies repository...');

mongoDB.connect(configs)
  .then((connection) => {
    FactoryRegister.register(configs.FACTORY);
    Server.start({
      port: configs.PORT,
      ssl: configs.SSL,
    }).then((app) => {
      logger.info(`The server is listening in port ${configs.PORT}`);
      app.on('close', () => {
        connection.close();
      });
    });
  })
  .catch(err => logger.error(err));
