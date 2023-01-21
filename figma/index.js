// eslint-disable-next-line
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { importIcons } = require('./icons');

const main = async () => {
  await importIcons();
};

main().catch((err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});
