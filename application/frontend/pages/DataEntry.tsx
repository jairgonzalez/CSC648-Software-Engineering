import React from 'react';
import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const DataEntry = (): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h1"> Please select a form</Text>
      <Link href="/CovidDataEntry">
        <Button variant="secondary"> Covid 19 Data Entry Form</Button>
      </Link>
      <Link href="/FireDataEntry">
        <Button variant="secondary"> WildFire Data Entry Form</Button>
      </Link>
    </Container>
  );
};

export default DataEntry;
