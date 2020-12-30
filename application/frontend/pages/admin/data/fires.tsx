import React from 'react';

import { apiTypes } from '@services';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

interface FiresDataProps {
  data: apiTypes.FireRecordResponse[];
}

const FiresData = ({ data }: FiresDataProps): JSX.Element => {
  return (
    <Container align="center">
      <Text variant="h2">Fires</Text>
      <Container>
        {data && data.length > 0 ? (
          data.map((f) => (
            <Container row>
              <Text variant="small">{f.active ? 'Active' : 'Inactive'}</Text>
            </Container>
          ))
        ) : (
          <Text variant="small">No fire records submitted.</Text>
        )}
      </Container>
    </Container>
  );
};

export default FiresData;
