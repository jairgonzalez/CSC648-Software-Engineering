import React from 'react';

import { Container } from '@components/Layouts';
import { Avatar, Link, Text } from '@components/DataDisplay';

const Yann = (): JSX.Element => {
  return (
    <Container align="center">
      <Avatar src="/yann.jpg" alt="Yann" size={200} />
      <Text variant="h1">Yann Sainson &#x1F1EB;&#x1F1F7;</Text>
      <Container align="center">
        <Text variant="h4">International student from France</Text>
        <Text variant="h5">
          Technology, cyber security, social & neurosciences enthusiast
        </Text>
        <Text variant="h5" align="center">
          CEO & co-founder&nbsp;
          <Link href="https://hiddentity.fr" newTab>
            @hiddentity
          </Link>
          <br />
          Full time employee as Fullstack Developer&nbsp;
          <Link href="https://ermes.ai" newTab>
            @ermes
          </Link>
          <br />
          Freelance Mobile Developer&nbsp;
          <Link href="https://shareview.fr" newTab>
            @shareview
          </Link>
          <br />
          French Navy reservist in cyber defense
        </Text>
        <Text variant="h4">Role: Frontend Lead</Text>
        <Container row>
          <Container>
            <Text variant="h3">
              <Link href="https://github.com/byfuury" newTab>
                Github
              </Link>
            </Text>
          </Container>
          <Container>
            <Text variant="h3">
              <Link href="https://www.linkedin.com/in/yannsainson/" newTab>
                LinkedIn
              </Link>
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Yann;
