import {
  Box,
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Badge,
  List,
  ThemeIcon,
  Timeline,
  SimpleGrid,
  Grid,
  Image,
  Stack,
} from '@mantine/core';
import { IconApi } from '@tabler/icons-react';


function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Box 
        style={{
          background: 'linear-gradient(135deg, #007BFF 0%, #00C6FF 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container size="lg">
          <Title order={1} c="white" mb={20}>
            Simplify Starknet Asset Management
          </Title>
          <Text c="white" size="xl" mb={40}>
            Powerful APIs and developer tools for token creation, management, and integration
          </Text>
          <Group>
            <Button 
              variant="white" 
              size="lg" 
              radius="md"
              component="a"
              href="#features"
              style={{ fontWeight: 600 }}
            >
              Explore Features
            </Button>
            <Button 
              variant="outline" 
              color="white" 
              size="lg" 
              radius="md"
              component="a"
              href="https://github.com/tokenkit"
              target="_blank"
              style={{ borderColor: 'rgba(255,255,255,0.8)' }}
            >
              GitHub
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="lg" py={60}>
        <Title order={2} mb={40} ta="center">
          Key Features
        </Title>
        <Grid>
          <Grid.Col span={{md: 6, lg: 3}}>
            <Card 
              shadow="sm" 
              p="lg" 
              radius="md"
              style={{
                transition: 'transform 0.2s',
                height: '100%',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ThemeIcon size={60} radius="xl" mb={20}>
                <IconApi size={40} />
              </ThemeIcon>
              <Title order={3} mb={10}>
                Unified Token API
              </Title>
              <Text size="sm" mb={20}>
                Access token balances, transfers, and metadata with a single API
              </Text>
              <Button 
                variant="outline" 
                color="blue" 
                radius="md" 
                fullWidth
                style={{ fontWeight: 500 }}
              >
                API Docs
              </Button>
            </Card>
          </Grid.Col>

          {/* Repeat similar structure for other feature cards */}
          {/* ... */}

        </Grid>
      </Container>

      {/* Tech Stack */}
      <Box bg="gray.0">
        <Container size="lg" py={60}>
          <Title order={2} mb={40} ta="center">
            Built With
          </Title>
          <Group justify="center" gap={40}>
            {[ 'NextJS', 'Mantine UI', 'Apibara', 'Django', 'PostgreSQL' ].map(tech => (
              <Badge 
                key={tech}
                variant="light" 
                size="lg" 
                radius="md"
                style={{ padding: '12px 24px', fontWeight: 500 }}
              >
                {tech}
              </Badge>
            ))}
          </Group>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="gray.0">
        <Container size="lg" py={60}>
          <Card 
            shadow="xl" 
            p={40} 
            radius="md" 
            withBorder
            style={{
              border: '2px solid #e9ecef',
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
          >
            <Group justify="apart">
              <Stack gap={0}>
                <Title order={3} mb={5}>
                  Ready to Build?
                </Title>
                <Text>Join 500+ developers using Tokenkit</Text>
              </Stack>
              <Button 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }} 
                size="lg"
                radius="md"
                component="a"
                href="/docs"
                style={{ fontWeight: 600 }}
              >
                Get Started
              </Button>
            </Group>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        bg="gray.1" 
        py={40}
        style={{
          borderTop: '1px solid #dee2e6',
        }}
      >
        <Container size="lg">
          <Group justify="apart">
            <Text>© 2024 Starknet Tokenkit</Text>
            <Group gap={20}>
              <a 
                href="/privacy"
                style={{ 
                  color: '#6c757d',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="/docs"
                style={{ 
                  color: '#6c757d',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Documentation
              </a>
              <a 
                href="https://github.com/tokenkit"
                style={{ 
                  color: '#6c757d',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                GitHub
              </a>
            </Group>
          </Group>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage;