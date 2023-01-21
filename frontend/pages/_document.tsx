import Document, {
  DocumentContext, Html, Head, Main, NextScript,
} from 'next/document';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { ServerStyleSheet } from 'styled-components';

import { ManifestMetaTags } from '@components/domains/marketing/ManifestMetaTags';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <App
                {...props}
              />
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      resetServerContext();
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <Html
        lang="en"
      >
        <Head
          prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#"
        >
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preconnect"
            href="/api"
          />
          <link
            rel="preconnect"
            href="https://www.googletagmanager.com/"
          />
          <link
            rel="preconnect"
            href="https://connect.facebook.net/"
          />
          <link
            rel="preconnect"
            href="https://js.stripe.com/v3/"
          />
          <ManifestMetaTags />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
