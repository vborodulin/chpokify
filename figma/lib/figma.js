const { api, apiFiles, apiImages } = require('./api');

const getDocument = async () => apiFiles.get('/');

const getNode = async (nodeId) => apiFiles.get(`/nodes?ids=${encodeURIComponent(nodeId)}`);

const getNodeChildren = async (nodeId) => {
  const { data: { nodes } } = await getNode(nodeId);
  return nodes[nodeId].document.children;
};

const getSVGImageUrl = async (nodeId) => {
  const { data: { images, err } } = await apiImages.get(`/?ids=${encodeURIComponent(nodeId)}&format=svg`);

  if (err) {
    throw err;
  }

  return images[nodeId];
};

const getImageContent = async (url) => api.get(url);

const figma = {
  getDocument,
  getNode,
  getNodeChildren,
  getSVGImageUrl,
  getImageContent,
};

module.exports = {
  figma,
};
