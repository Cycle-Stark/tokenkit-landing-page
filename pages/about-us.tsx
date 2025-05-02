import React from 'react';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';
import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  Box, 
  Stack, 
  Group, 
  Avatar, 
  Card, 
  useMantineTheme, 
  useMantineColorScheme,
  Timeline,
  List,
  ThemeIcon,
  rem,
  Image
} from '@mantine/core';
import { ReactSVG } from 'react-svg';
import { 
  IconBrandGithub, 
  IconBrandTwitter, 
  IconBrandLinkedin, 
  IconCheck, 
  IconCode, 
  IconCoin, 
  IconDeviceDesktop, 
  IconUsers 
} from '@tabler/icons-react';

// Team member data
const teamMembers = [
  {
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    bio: 'Blockchain enthusiast with 8+ years of experience in DeFi and smart contract development.',
    avatar: '/images/team/avatar1.png',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'Former StarkWare engineer with expertise in ZK-rollups and layer 2 scaling solutions.',
    avatar: '/images/team/avatar2.png',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in React and Solidity with a passion for Web3.',
    avatar: '/images/team/avatar3.png',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager',
    bio: 'Product strategist with experience at major DeFi protocols and a focus on user experience.',
    avatar: '/images/team/avatar4.png',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

// Company timeline data
const companyTimeline = [
  {
    title: 'Tokenkit Founded',
    description: 'Started with a vision to simplify token management on Starknet.',
    date: 'January 2023',
    icon: <IconCoin size={16} />
  },
  {
    title: 'Alpha Release',
    description: 'Launched our first API endpoints and developer toolkit.',
    date: 'April 2023',
    icon: <IconCode size={16} />
  },
  {
    title: 'Beta Program',
    description: 'Onboarded 50 early developers to test our platform.',
    date: 'July 2023',
    icon: <IconUsers size={16} />
  },
  {
    title: 'Public Launch',
    description: 'Released Tokenkit 1.0 with full feature set and documentation.',
    date: 'October 2023',
    icon: <IconDeviceDesktop size={16} />
  }
];

// Core values
const coreValues = [
  {
    title: 'Innovation',
    description: "Pushing the boundaries of what's possible in the Starknet ecosystem.",
  },
  {
    title: 'Security',
    description: 'Maintaining the highest standards of security in all our products.'
  },
  {
    title: 'Accessibility',
    description: 'Making complex blockchain technology accessible to all developers.'
  },
  {
    title: 'Community',
    description: 'Building and supporting a vibrant community of builders and users.'
  }
];

const AboutUs = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box>
      {/* Hero Section */}
      <Box pos="relative" py={60}>
        <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity: 0.4 }}>
          <ReactSVG 
            src="/images/svg/landing/light/main-background.svg" 
            className="svg-holder"
            style={{ opacity: 0.6 }} 
          />
        </Box>
        <Container size="xl">
          <Stack align="center" gap="xl">
            <Title order={1} size={48} ta="center" fw={700}>
              About Tokenkit
            </Title>
            <Text size="xl" ta="center" maw={700} mx="auto">
              We're building the future of token management on Starknet, empowering developers with powerful tools and APIs.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Our Mission */}
      <Container size="xl" py={60}>
        <Grid gutter={40}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2} size={36}>Our Mission</Title>
              <Text size="lg">
                At Tokenkit, our mission is to provide developers with seamless access to token data and intuitive tools that enhance their experience in building decentralized applications on Starknet. We aim to simplify token interactions for everyone.
              </Text>
              <Text size="lg">
                We believe that by creating robust infrastructure and developer-friendly tools, we can accelerate the adoption of Starknet and contribute to the growth of the entire ecosystem.
              </Text>
              <List
                size="lg"
                icon={
                  <ThemeIcon color={theme.primaryColor} radius="xl" size={24}>
                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>Simplifying token integration for developers</List.Item>
                <List.Item>Providing real-time data on token activity</List.Item>
                <List.Item>Building tools that scale with the ecosystem</List.Item>
                <List.Item>Supporting the growth of Starknet adoption</List.Item>
              </List>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ReactSVG 
                src="/images/svg/landing/light/features-section.svg" 
                className="svg-holder"
                style={{ opacity: 0.7 }} 
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Core Values */}
      <Box 
        py={60} 
        style={{ 
          background: isDark 
            ? "linear-gradient(45deg, #000000, #000000)"
            : "linear-gradient(45, theme.colors.gray[0], theme.colors.gray[2])"
        }}
      >
        <Container size="xl">
          <Stack gap="xl" align="center" mb={40}>
            <Title order={2} size={36} ta="center">Our Core Values</Title>
            <Text size="lg" ta="center" maw={700} mx="auto">
              These principles guide everything we do, from product development to community engagement.
            </Text>
          </Stack>
          
          <Grid gutter={30}>
            {coreValues.map((value, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder
                  style={{ 
                    height: '100%',
                    borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
                    backgroundColor: isDark ? theme.colors.dark[6] : theme.white
                  }}
                >
                  <Stack>
                    <Title order={3} size="h4">{value.title}</Title>
                    <Text>{value.description}</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Journey */}
      <Container size="xl" py={60}>
        <Stack gap="xl" align="center" mb={40}>
          <Title order={2} size={36} ta="center">Our Journey</Title>
          <Text size="lg" ta="center" maw={700} mx="auto">
            From idea to reality, here's how Tokenkit has evolved over time.
          </Text>
        </Stack>
        
        <Box pos="relative">
          <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity: 0.2 }}>
            <ReactSVG 
              src="/images/svg/landing/light/sdk-section.svg" 
              className="svg-holder"
              style={{ opacity: 0.5 }} 
            />
          </Box>
          
          <Timeline active={companyTimeline.length - 1} bulletSize={24} lineWidth={2}>
            {companyTimeline.map((item, index) => (
              <Timeline.Item 
                key={index} 
                bullet={item.icon} 
                title={item.title}
              >
                <Text color="dimmed" size="sm">{item.date}</Text>
                <Text size="md" mt={4}>{item.description}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box>
      </Container>

      {/* Team Section */}
      <Box 
        py={60} 
        style={{ 
          background: isDark 
            ? `linear-gradient(to right,rgb(12, 12, 12),rgb(34, 34, 34))`
            :  `theme.fn.linearGradient(45, theme.colors.gray[0], theme.colors.gray[2])`
        }}
      >
        <Container size="xl">
          <Stack gap="xl" align="center" mb={40}>
            <Title order={2} size={36} ta="center" c={isDark ? 'white' : undefined}>Meet Our Team</Title>
            <Text size="lg" ta="center" maw={700} mx="auto" c={isDark ? 'white' : undefined}>
              The passionate individuals behind Tokenkit working to revolutionize token management on Starknet.
            </Text>
          </Stack>
          
          <Grid gutter={30}>
            {teamMembers.map((member, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder
                  style={{ 
                    height: '100%',
                    borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
                    backgroundColor: isDark ? theme.colors.dark[6] : theme.white
                  }}
                >
                  <Card.Section mb="md">
                    <Box p="md" style={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar 
                        src={member.avatar} 
                        size={120} 
                        radius={120} 
                        mx="auto"
                      />
                    </Box>
                  </Card.Section>
                  
                  <Stack gap="xs" ta="center">
                    <Title order={4}>{member.name}</Title>
                    <Text size="sm" c="dimmed" fw={500}>{member.role}</Text>
                    <Text size="sm" mt="xs">{member.bio}</Text>
                    
                    <Group justify="center" gap="xs" mt="md">
                      <IconBrandTwitter 
                        size={20} 
                        style={{ cursor: 'pointer', color: theme.colors.blue[5] }} 
                      />
                      <IconBrandGithub 
                        size={20} 
                        style={{ cursor: 'pointer' }} 
                      />
                      <IconBrandLinkedin 
                        size={20} 
                        style={{ cursor: 'pointer', color: theme.colors.blue[7] }} 
                      />
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Container size="xl" py={60}>
        <Grid gutter={40} align="center">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <Title order={2} size={36}>Join Our Mission</Title>
              <Text size="lg">
                We're always looking for talented individuals who are passionate about blockchain technology and want to make a difference in the Starknet ecosystem.
              </Text>
              <Text size="lg">
                Whether you're a developer, designer, marketer, or community builder, there might be a place for you on our team. Check out our open positions or reach out to us directly.
              </Text>
              <List
                size="lg"
                icon={
                  <ThemeIcon color={theme.primaryColor} radius="xl" size={24}>
                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>Flexible remote work environment</List.Item>
                <List.Item>Competitive compensation packages</List.Item>
                <List.Item>Opportunity to shape the future of Starknet</List.Item>
                <List.Item>Continuous learning and growth</List.Item>
              </List>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <ReactSVG 
              src="/images/svg/landing/light/notifications-section.svg" 
              className="svg-holder"
              style={{ opacity: 0.7 }} 
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

AboutUs.PageLayout = HeaderAndFooterWrapper;
export default AboutUs;
