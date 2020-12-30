import React, { ReactNode } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

import StyledLink from './style';

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  newTab?: boolean;
}

const Link = ({
  children,
  href,
  replace,
  scroll,
  shallow,
  newTab = false,
}: LinkProps): JSX.Element => {
  return (
    <NextLink
      href={href}
      passHref
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <StyledLink target={newTab ? '_blank' : '_self'}>{children}</StyledLink>
    </NextLink>
  );
};

export default Link;
