const server = require('./server');
const Config = require('./config/config');
const mongoDB = require('./mongodb');
const { FactoryRegister } = require('./Factory');

const config = new Config();

console.log('--- Movies Service ---');
console.log('Connecting to movies repository...');

mongoDB.connect(config)
  .then((connection) => {
    FactoryRegister.register(config.FACTORY);
    server.start({
      port: config.PORT,
      config,
    }).then((app) => {
      console.log(`The server is listening in port ${config.PORT}`);
      app.on('close', () => {
        connection.close();
      });
    });
  })
  .catch(err => console.log(err));
