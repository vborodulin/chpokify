import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

const getVideoUrl = (id: string, baseUrl: string) =>
  `https://www.youtube.com/embed/${id}?showinfo=0&enablejsapi=1&origin=${baseUrl}`;

export type TYouTubeEmbedProps = {
  title: string;
  id: string;
  previewSrc: string;
  width: string;
  height: string;
}

const YouTubeEmbed = (props: TYouTubeEmbedProps): React.ReactElement | null => {
  const {
    title,
    id,
    previewSrc,
    width,
    height,
  } = props;

  const baseUrl = useSelector(configSelectors.getBaseUrl);

  return (
    <iframe
      width={width}
      height={height}
      src={getVideoUrl(id, baseUrl)}
      /* eslint-disable-next-line max-len */
      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{object-fit: cover}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${getVideoUrl(id, baseUrl)}><img src=${previewSrc} alt='${title}'><span>▶</span></a>`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  );
};

export {
  YouTubeEmbed,
};
