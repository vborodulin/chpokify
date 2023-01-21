import React from 'react';

const ManifestMetaTags = () => (
  <>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/pwa-assets/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/pwa-assets/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/pwa-assets/favicon-16x16.png"
    />
    <link
      rel="manifest"
      href="/pwa-assets/site.webmanifest"
    />
    <link
      rel="mask-icon"
      href="/pwa-assets/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <link
      rel="shortcut icon"
      href="/pwa-assets/icon.ico"
    />
    <meta
      name="msapplication-TileColor"
      content="#da532c"
    />
    <meta
      name="msapplication-config"
      content="/pwa-assets/browserconfig.xml"
    />
    <meta
      name="theme-color"
      content="#3D5AFE"
    />
  </>
);

export {
  ManifestMetaTags,
};
