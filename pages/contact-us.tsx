import { ActionIcon, Anchor, Box, Container, Divider, Grid, Group, Stack, Text, Title, Tooltip, darken, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';
import Head from 'next/head';
import { APP_NAME } from '@/utils/constants';
import ContactCreateForm from '@/components/forms/ContactCreateForm';
import { isDarkMode } from '@/utils/functions';
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter, IconBrandTelegram, IconMail, IconPhoneCall } from '@tabler/icons-react';
import WrapperBox from '@/components/common/WrapperBox';
import { ReactNode } from 'react';

interface ISocialIcon {
  title: string
  url: string
  color: string
  icon: ReactNode
}

const SocialIcon = (props: ISocialIcon) => {
  const { title, url, color, icon } = props
  return (
    <Tooltip label={title} color={color}>
      <Anchor href={url} target='_blank'>
        <ActionIcon color={color} size={'42px'} radius={'md'} variant='light'>
          {icon}
        </ActionIcon>
      </Anchor>
    </Tooltip>
  )
}

const socialLinks: ISocialIcon[] = [
  {
    title: "Twitter",
    url: "https://twitter.com/tokenkit",
    color: "blue",
    icon: <IconBrandTwitter />
  },
  {
    title: "Discord",
    url: "https://discord.gg/tokenkit",
    color: "indigo",
    icon: <IconBrandDiscord />
  },
  {
    title: "Telegram",
    url: "https://t.me/tokenkit",
    color: "cyan",
    icon: <IconBrandTelegram />
  },
  {
    title: "GitHub",
    url: "https://github.com/tokenkit",
    color: "dark",
    icon: <IconBrandGithub />
  },
]

function ContactUs() {
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <>
      <Head>
        <title>{`${APP_NAME} - Contact Us`}</title>
      </Head>
      <Stack>
        <Box py={'70px'} bg={isDarkMode(colorScheme) ? darken(theme.colors[theme.primaryColor][9], 0.5) : theme.colors[theme.primaryColor][8]}>
          <Title size={'52px'} ta={'center'} c="white">Get In Touch</Title>
          <Text size="lg" fw={500} c="white" ta={'center'}>We'd love to hear from you</Text>
        </Box>
        <Container size={"lg"} py={"70px"}>
          <Grid>
            <Grid.Col span={{ md: 6 }}>
              <Box p={{ md: '40px' }} bg={isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[1]} style={{
                borderRadius: theme.radius.lg
              }}>
                <Stack p="lg">
                  <Title order={2} size={'32px'}>Send Message</Title>
                  <Text>Write us a message and we will respond to you quickly</Text>
                  <ContactCreateForm />
                </Stack>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ md: 6 }} p={{ md: '40px' }}>
              <Stack px="lg">
                <Divider
                  my="xs"
                  variant="solid"
                  size={4}
                  color='green'
                  fw={600}
                  labelPosition="center"
                  label={
                    <>
                      <IconPhoneCall size={22} />
                      <Text ml={5} fw={600} size='22px'>OR</Text>
                    </>
                  }
                />
                <WrapperBox color='yellow'>
                  <Group wrap='nowrap'>
                    <ActionIcon color='yellow' radius={'md'} size={'42px'}>
                      <IconMail />
                    </ActionIcon>
                    <Stack gap={2}>
                      <Text fw={600} size='lg'>Email Us</Text>
                      <Anchor href="mailto:support@tokenkit.dev">
                        <Text fw={500} size='md' c={isDarkMode(colorScheme) ? 'white' : 'dark'}>
                          support@tokenkit.dev
                        </Text>
                      </Anchor>
                    </Stack>
                  </Group>
                </WrapperBox>
                <WrapperBox color='violet'>
                  <Stack gap={10}>
                    <Title order={3}>Our Socials</Title>
                    <Group gap={20} justify='space-evenly'>
                      {
                        socialLinks?.map((item: ISocialIcon, i: number) => (
                          <SocialIcon key={`social_${i}_${item.title}`} {...item} />
                        ))
                      }
                    </Group>
                  </Stack>
                </WrapperBox>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Stack>
    </>
  );
}


ContactUs.PageLayout = HeaderAndFooterWrapper

export default ContactUs
