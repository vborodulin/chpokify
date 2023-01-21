const SVGO = require('svgo');

const svgo = new SVGO({
  plugins: [
    {
      cleanupAttrs: true,
    }, {
      removeDoctype: true,
    }, {
      removeXMLProcInst: true,
    }, {
      removeComments: true,
    }, {
      removeMetadata: true,
    }, {
      removeTitle: true,
    }, {
      removeDesc: true,
    }, {
      removeUselessDefs: true,
    }, {
      removeEditorsNSData: true,
    }, {
      removeEmptyAttrs: true,
    }, {
      removeHiddenElems: true,
    }, {
      removeEmptyText: false,
    }, {
      removeEmptyContainers: false,
    }, {
      removeViewBox: false,
    }, {
      cleanupEnableBackground: false,
    }, {
      convertStyleToAttrs: false,
    }, {
      convertColors: false,
    }, {
      convertPathData: false,
    }, {
      convertTransform: false,
    }, {
      removeUnknownsAndDefaults: false,
    }, {
      removeNonInheritableGroupAttrs: false,
    }, {
      removeUselessStrokeAndFill: false,
    }, {
      removeUnusedNS: false,
    }, {
      cleanupIDs: false,
    }, {
      cleanupNumericValues: false,
    }, {
      cleanupListOfValues: false,
    }, {
      moveElemsAttrsToGroup: false,
    }, {
      moveGroupAttrsToElems: true,
    }, {
      collapseGroups: true,
    }, {
      removeRasterImages: true,
    }, {
      mergePaths: true,
    }, {
      convertShapeToPath: true,
    }, {
      sortAttrs: true,
    }, {
      removeDimensions: true,
    }, {
      removeAttrs: { attrs: '(stroke|fill)' },
    }],
});

module.exports = {
  svgo,
};
