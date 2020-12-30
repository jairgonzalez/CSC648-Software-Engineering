import React from 'react';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Alvaro = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h2">Alvaro Maroto</Text>
      <p>
        <img src="/alvaro.png" alt="alvarophoto" />
      </p>

      <Container align="center">
        <Text variant="h4">
          Computer Science and engineering student at UC3M and SFSU
          <br />
          Hometown: Madrid, Spain
          <br />
          Role: Support
          <br />
          Info: I like sports (soccer, racing, boxing), videogames and traveling
        </Text>
      </Container>

      <Container>
        <Text variant="h3">
          <a href="https://github.com/amarotoyepes">Github </a>
          <a href="https://www.instagram.com/amaroto1">Instagram</a>
        </Text>
      </Container>
    </Container>
  );
};

export default Alvaro;
