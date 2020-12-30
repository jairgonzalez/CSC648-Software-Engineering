import React from 'react';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

import { useAuth } from '@contexts/AuthContext';

const Home = (): JSX.Element => {
  const { accessToken } = useAuth();

  return (
    <Container row justify="center">
      <Text variant="h3" align="center">
        SFSU Software Engineering Project CSC 648-848, Fall 2020. For
        Demonstration Only
      </Text>
      <Container align="center">
        <Link href="/DataEntry">
          <Button thickness="large" size="xl">
            Data Entry
          </Button>
        </Link>
        <Link href="/vphome">
          <Button thickness="large" size="xl">
            Data Display
          </Button>
        </Link>
        {accessToken && (
          <Link href="/Employee">
            <Button thickness="large" size="xl">
              Employee Dashboard
            </Button>
          </Link>
        )}
      </Container>
    </Container>
  );
};

export default Home;
