import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { theme } from '@utils';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button, TextField } from '@components/Inputs';
import { useAuth } from '@contexts/AuthContext';

const Login = (): JSX.Element => {
  const { login, accessToken } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (callback: (p: string) => void) => (v: string) => {
    if (error) {
      setError(false);
    }
    callback(v);
  };

  if (accessToken) {
    router.push('/');
    return <></>;
  }

  return (
    <Container align="center">
      <Text variant="h1">Login</Text>
      <TextField
        size="xl"
        thickness="large"
        onChange={handleChange(setEmail)}
        placeholder="email"
        type="email"
      />
      <TextField
        size="xl"
        thickness="large"
        onChange={handleChange(setPassword)}
        placeholder="password"
        type="password"
      />
      {error && (
        <Text variant="small" color={theme.cvar('colorErrorMedium')}>
          Your email or password is invalid.
        </Text>
      )}
      <Button
        size="xl"
        disabled={email.length === 0 || password.length === 0}
        onClick={() => {
          login(
            email,
            password,
            (isAdmin: boolean) => router.push(isAdmin ? '/admin' : '/'),
            () => setError(true)
          );
        }}
      >
        Login
      </Button>
      <Text variant="small">
        Doesn&apos;t have an account?&nbsp;
        <Link href="/register">Register</Link>
      </Text>
    </Container>
  );
};

export default Login;
