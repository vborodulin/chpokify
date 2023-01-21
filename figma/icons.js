const Bluebird = require('bluebird');
const { pascalCase } = require('change-case');
const fs = require('fs');
const path = require('path');

const { getIconTSXTemplate } = require('./helpers');
const { figma, svgo } = require('./lib');

const IconsDir = process.env.CLIENT_ICONS_DIR;

const getIconFolderPath = (name) => path.resolve(IconsDir, pascalCase(name));

const clearIconsFolder = () => {};

const generateIcon = async (iconNode) => {
  try {
    const iconUrl = await figma.getSVGImageUrl(iconNode.id);

    const iconName = pascalCase(iconNode.name);
    const iconFolderPath = getIconFolderPath(iconName);

    if (!fs.existsSync(iconFolderPath)) {
      fs.mkdirSync(iconFolderPath);
    }

    const { data: iconContent } = await figma.getImageContent(iconUrl);
    const { data: iconContentOptimized } = await svgo.optimize(iconContent);

    fs.writeFileSync(
      path.resolve(iconFolderPath, `${iconName}.svg`),
      iconContentOptimized,
      { encoding: 'utf8' }
    );

    const iconTemplate = getIconTSXTemplate(iconName);
    fs.writeFileSync(path.resolve(iconFolderPath, 'index.tsx'), iconTemplate, { encoding: 'utf8' });

    console.log(`${iconName} was written success!`);
  } catch (err) {
    console.log(`generate icon error: ${iconNode.name} - ${err}`);
  }
};

const generateImports = (iconNodes) => {
  const fileWithImportsPath = path.resolve(IconsDir, 'index.ts');

  const importsContent = iconNodes
    .map((iconNode) => {
      const iconName = pascalCase(iconNode.name);
      return `export * from './${iconName}';`;
    })
    .join('\n');
  fs.writeFileSync(fileWithImportsPath, importsContent, { encoding: 'utf8' });

  console.log('imports was written success!');
};

const importIcons = async () => {
  clearIconsFolder();

  const iconNodesArr = await figma.getNodeChildren(process.env.FIGMA_ICONS_NODE_ID);

  await Bluebird.map(iconNodesArr, generateIcon, {
    concurrency: 5,
  });

  await generateImports(iconNodesArr);
};

module.exports = {
  importIcons,
};
