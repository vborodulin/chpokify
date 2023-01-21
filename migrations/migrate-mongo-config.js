const path = require('path');
require('dotenv')
  .config();

const MONGODB_PASS = encodeURIComponent(process.env.MONGO_ROOT_PASSWORD);

module.exports = {
  mongodb: {
    url: `mongodb://root:${MONGODB_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    databaseName: process.env.MONGO_DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      authMechanism: 'SCRAM-SHA-1',
    },
  },
  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: path.resolve(__dirname, './migrations'),

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',
};
