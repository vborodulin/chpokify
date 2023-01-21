import { routing } from '@chpokify/routing';
import { Trans } from 'next-i18next';
import React from 'react';

import { LinkComponent } from '@components/uiKit/Link';
import { Text, TTextProps } from '@components/uiKit/Text';

type TermsProps = Partial<TTextProps> & {}

const Terms = (props: TermsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <Text
      fontSize={1}
      textAlign="center"
      {...other}
    >
      <Trans
        i18nKey="termsOfUse.mainMessage"
        components={{
          termsLink: (
            <LinkComponent
              href={routing.getTermsOfUseUrl()}
              target="_blank"
              fontSize={1}
            />
          ),
          privacyLink: (
            <LinkComponent
              href={routing.getPrivacyPolicyUrl()}
              target="_blank"
              fontSize={1}
            />
          ),
        }}
      />
    </Text>
  );
};

export {
  Terms,
};
