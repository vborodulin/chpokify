import React from 'react';

export type TLDJsonProps = {
  schema: Record<string, any>
}

const LDJson = (props: TLDJsonProps): React.ReactElement | null => {
  const {
    schema,
  } = props;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export {
  LDJson,
};
