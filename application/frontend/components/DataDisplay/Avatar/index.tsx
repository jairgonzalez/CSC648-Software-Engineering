import React from 'react';

import { Container, Spacer } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

import { StyledAvatarProps, StyledAvatar } from './style';

interface AvatarProps extends Partial<StyledAvatarProps> {
  src: string;
  alt: string;
  label?: string;
  labelLocation?: 'left' | 'right' | 'top' | 'bottom';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

const Avatar = ({
  src,
  alt,
  size = 90,
  rounded = true,
  align = 'center',
  label,
  labelLocation = 'bottom',
  gap = 3,
}: AvatarProps): JSX.Element => {
  return (
    <Container
      align="center"
      row={labelLocation === 'left' || labelLocation === 'right'}
      reverse={labelLocation === 'left' || labelLocation === 'top'}
      gap={gap}
    >
      <StyledAvatar size={size} rounded={rounded} align={align}>
        <img src={src} alt={alt} />
      </StyledAvatar>
      {label && (
        <>
          <Spacer size={1} />
          <Text variant="p">{label}</Text>
        </>
      )}
    </Container>
  );
};

export default Avatar;
