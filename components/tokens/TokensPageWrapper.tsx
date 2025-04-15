import React, { ReactNode } from 'react';
import { Box, Title, Text, useMantineColorScheme, useMantineTheme, Stack, Container } from '@mantine/core';
import Image from 'next/image';

interface TokensPageWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const TokensPageWrapper: React.FC<TokensPageWrapperProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  return (
    <Container
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        padding: '20px',
      }}
      size="xl"
      fluid={false}
    >
      {/* Background SVGs for web3 aesthetic */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 0,
          opacity: 0.3,
          color: isDark ? theme.colors.violet[9] : theme.colors.violet[3],
        }}
      >
        <Image
          src="/images/svg/token-hexagon.svg"
          width={300}
          height={300}
          alt=""
          style={{ color: 'currentColor' }}
        />
      </Box>
      
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          opacity: 0.2,
          color: isDark ? theme.colors.indigo[9] : theme.colors.indigo[3],
        }}
      >
        <Image
          src="/images/svg/token-grid.svg"
          width={300}
          height={300}
          alt=""
          style={{ color: 'currentColor' }}
        />
      </Box>
      
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.1,
          color: isDark ? theme.colors.violet[5] : theme.colors.violet[3],
        }}
      >
        <Image
          src="/images/svg/token-nodes.svg"
          width={500}
          height={500}
          alt=""
          style={{ color: 'currentColor' }}
        />
      </Box>
      
      {/* Content */}
      <Box
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack gap="xs" mb="xl">
          <Text
            size="2.5rem"
            w="fit-content"
            variant="gradient" component="span" gradient={{ from: 'violet', to: 'indigo' }}
          >
            {title}
          </Text>
          
          {description && (
            <Text 
              size="lg" 
              c={isDark ? 'dimmed' : 'dark.3'}
              mb="lg"
            >
              {description}
            </Text>
          )}
        </Stack>
        
        {children}
      </Box>
    </Container>
  );
};

export default TokensPageWrapper;
