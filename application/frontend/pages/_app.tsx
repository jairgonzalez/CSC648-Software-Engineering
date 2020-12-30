import React, { useEffect } from 'react';
import { Moon, Sun, ArrowLeftCircle } from 'react-feather';
import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { useMounted } from '@hooks';
import { theme, gtag } from '@utils';

import ThemeContext, { useTheme } from '@contexts/ThemeContext';
import AuthContext, { useAuth } from '@contexts/AuthContext';

import { Button, Toggle } from '@components/Inputs';
import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';

// import 'styles/fonts.css';
import 'styles/main.css';
import 'node_modules/leaflet/dist/leaflet.css';

const AppContent = ({ Component, pageProps }: AppProps): JSX.Element => {
  const mounted = useMounted();
  const [scheme, toggle] = useTheme();
  const { logout, accessToken, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (!mounted) {
    return <></>;
  }

  if (router.route.includes('admin') && !accessToken) {
    router.push('/');
    return <></>;
  }

  return (
    <ThemeProvider theme={{ mode: scheme }}>
      <Container gap={0} style={{ minHeight: '100vh' }} justify="space-between">
        <Container flex={0}>
          <Container row justify="space-between" flex={0} noWrap>
            <Container>
              <ArrowLeftCircle
                style={{ cursor: Router.route === '/' ? 'default' : 'pointer' }}
                onClick={() => (Router.route !== '/' ? Router.back() : {})}
                color={theme.cvar(
                  Router.route === '/' ? 'colorBackground' : 'colorForeground'
                )}
              />
            </Container>
            <Container>
              <Text variant="h3" align="center" noMargin>
                CSC648 - Team 6
              </Text>
            </Container>
            <Container row justify="flex-end" noWrap>
              {!accessToken ? (
                <>
                  <Link href="/register">
                    <Button variant="secondary" thickness="small" size="short">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="secondary" thickness="small" size="short">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    thickness="small"
                    size="short"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                  {role === 'admin' && (
                    <Button
                      variant="secondary"
                      thickness="small"
                      size="short"
                      onClick={() => router.push('/admin')}
                    >
                      Admin
                    </Button>
                  )}
                </>
              )}
              <Sun size={16} color={theme.cvar('colorForeground')} />
              <Toggle
                toggled={scheme === 'dark'}
                onChange={(): void => toggle()}
              />
              <Moon size={16} color={theme.cvar('colorForeground')} />
            </Container>
          </Container>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Container>
        <Container row justify="center" flex={0} align="center">
          <Text variant="h5">
            Made with&nbsp;
            {scheme === 'light' ? '🖤' : '🤍'}
            &nbsp;by the&nbsp;
            <Link href="/about">
              <Text variant="small" color={theme.cvar('colorLink')}>
                dream team
              </Text>
            </Link>
          </Text>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

const App = (props: AppProps): JSX.Element => {
  return (
    <ThemeContext>
      <AuthContext>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AppContent {...props} />
      </AuthContext>
    </ThemeContext>
  );
};

export default App;
