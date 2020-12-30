import React, { CSSProperties, ReactNode } from 'react';

import { StyledContainer, StyledContainerProps } from './style';

interface ContainerProps extends Partial<StyledContainerProps> {
  children: ReactNode;
  style?: CSSProperties;
}

const Container = ({
  children,
  flex = 1,
  row = false,
  reverse = false,
  noWrap = false,
  justify = 'flex-start',
  align = row ? 'center' : 'stretch',
  gap = 3,
  bg = 'transparent',
  style,
}: ContainerProps): JSX.Element => {
  return (
    <StyledContainer
      flex={flex}
      row={row}
      reverse={reverse}
      noWrap={noWrap}
      justify={justify}
      align={align}
      gap={gap}
      bg={bg}
      style={style}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
