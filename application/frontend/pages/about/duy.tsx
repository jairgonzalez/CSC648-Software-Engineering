import React from 'react';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Duy = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1">Duy Nguyen</Text>
      <img src="/duy.png" width="375" height="375" alt="Duy" />
      <Text variant="h4">
        Undergraduate at San Francisco state university
        <br />
        Role: Github master
        <br />
      </Text>
    </Container>
  );
};

export default Duy;
