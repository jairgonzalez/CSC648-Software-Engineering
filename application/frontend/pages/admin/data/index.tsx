import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { apiTypes, api } from '@services';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const Data = (): JSX.Element => {
  const [data, setData] = useState<apiTypes.SubmittedRecordsResponse>();
  const router = useRouter();

  useEffect(() => {
    api.getSubmittedData().then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, []);

  console.log(data);
  return (
    <Container align="center">
      <Text variant="h2">Data Validation</Text>
      <Container row>
        <Button
          thickness="large"
          size="xl"
          onClick={() => router.push('/admin/data/fires')}
        >
          Fires
        </Button>
        <Button thickness="large" size="xl">
          COVID-19
        </Button>
      </Container>
    </Container>
  );
};

export default Data;
