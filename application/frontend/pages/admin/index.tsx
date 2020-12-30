import React from 'react';
import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'next/router';
import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const AdminHome = (): JSX.Element => {
  const { role } = useAuth();
  const router = useRouter();

  if (role !== 'admin') {
    router.push('/');
    return <></>;
  }
  return (
    <Container align="center">
      <Text variant="h2">Admin dashboard</Text>
      <Button
        thickness="large"
        size="xl"
        onClick={() => router.push('/admin/users')}
      >
        Users
      </Button>
      <Button
        thickness="large"
        size="xl"
        onClick={() => router.push('/admin/data')}
      >
        Data validation
      </Button>
    </Container>
  );
};

export default AdminHome;
