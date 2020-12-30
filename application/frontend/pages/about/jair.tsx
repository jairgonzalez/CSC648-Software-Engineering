import React from 'react';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Jair = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1">Jair Gonzalez</Text>
      <img src="/jair.png" width="375" height="375" alt="Jair" />
      <Text variant="h4">
        Computer Science Student at SFSU
        <br />
        Hometown: San Bruno, California
        <br />
        Role: Full Stack Developer
      </Text>
      <h2>
        <a href="https://github.com/jairgonzalez">GitHub</a>
        <a href="https://twitter.com/jairgonzalezbot">Twitter</a>
        <a href="https://www.linkedin.com/in/jair-gonzalez-3b5319121/">
          LinkedIn
        </a>
      </h2>
    </Container>
  );
};

export default Jair;
