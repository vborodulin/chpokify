// eslint-disable-next-line
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const axios = require('axios');

const headers = {
  'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN,
};

const { FIGMA_FILE_KEY } = process.env;

const api = axios.create();

const apiFiles = axios.create({
  baseURL: `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
  headers,
});

const apiImages = axios.create({
  baseURL: `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`,
  headers,
});

module.exports = {
  api,
  apiFiles,
  apiImages,
};
