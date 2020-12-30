import React, { useEffect, useState } from 'react';

import { apiTypes, api } from '@services';

import { Container, Spacer } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { Autocomplete, Button } from '@components/Inputs';

const Users = (): JSX.Element => {
  const [countyId, setCountyId] = useState<string>();
  const [users, setUsers] = useState<apiTypes.UserRecord[]>([]);
  const [counties, setCounties] = useState<apiTypes.CountyRecord[]>([]);

  useEffect(() => {
    api.getCounties().then((res) => {
      if (res) {
        setCounties(res);
      }
    });
  }, []);

  useEffect(() => {
    if (countyId) {
      api.getUsers(countyId ?? '').then((res) => {
        if (res) {
          setUsers(res);
        }
      });
    }
  }, [countyId]);

  const handleDelete = (userId: number) => () => {
    api.deleteUser(userId).then((res) => {
      if (res) {
        setUsers(users.filter((u) => u.id !== userId));
      }
    });
  };

  return (
    <Container align="center">
      <Text variant="h2">Users</Text>
      <Autocomplete
        title="Select your county"
        placeholder="County..."
        options={counties.map((c) => ({ label: c.name, value: c.id }))}
        onSelect={setCountyId}
      />
      <Container>
        {users.length > 0 ? (
          users.map((u) => (
            <Container row key={u.id} gap={0} justify="space-between">
              <Text variant="small">{u.firstName}</Text>
              <Spacer size="large" />
              <Text variant="small">{u.lastName}</Text>
              <Spacer size="large" />
              <Text variant="small">{u.email}</Text>
              <Spacer size="large" />
              <Text variant="small">{u.phone}</Text>
              <Spacer size="large" />
              <Button
                size="short"
                thickness="small"
                onClick={handleDelete(u.id)}
              >
                Delete
              </Button>
            </Container>
          ))
        ) : (
          <Text variant="small">No user for this county.</Text>
        )}
      </Container>
    </Container>
  );
};

export default Users;
