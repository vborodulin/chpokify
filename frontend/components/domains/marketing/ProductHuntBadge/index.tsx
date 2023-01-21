import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TProductHuntBadgeProps = Partial<TBoxProps>;

const ProductHuntBadge = (props: TProductHuntBadgeProps): React.ReactElement | null => (
  <a
    /* eslint-disable-next-line max-len */
    href="https://www.producthunt.com/posts/chpokify?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chpokify"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Box
      as="img"
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=280567&theme=dark"
      alt="Chpokify - Agile teams management tools | Product Hunt"
      width="100%"
      {...props}
    />
  </a>
);

export {
  ProductHuntBadge,
};
