import React from 'react';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Lauren = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1">Lauren Wong</Text>
      <img src="/lauren.jpg" alt="Lauren" />
      <Text variant="h4">
        Senior at SFSU studying Computer Science
        <br />
        Hometown: San Francisco
        <br />
        Role: Team Lead
        <br />
      </Text>
      <a href="https://www.instagram.com/chocochiyoko">Instagram</a>
    </Container>
  );
};

export default Lauren;
