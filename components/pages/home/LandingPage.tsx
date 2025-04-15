import { Anchor, Box, Button, Card, Container, em, Grid, Group, Image, List, SimpleGrid, Stack, Text, Timeline, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import SvgBackground from "../../ui/SvgBackground";
import CreateSubscriberForm from "./../../forms/CreateSubscriberForm";
import { useState, useEffect } from "react";
import { ISimpleCard, ITimeline } from "@/utils/types";
import { IconApi, IconArrowRight, IconBell, IconBrandNpm, IconBrandYarn, IconChartBar, IconCode, IconCoins, IconComponents, IconDatabase, IconEdit, IconLayersIntersect, IconRocket, IconSearch, IconServer } from "@tabler/icons-react";
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';

import { SelectTokenModal, themes, TokenKitWrapper, SelectTokenContainer, IToken, Theme } from "starknet-tokenkit"
import { useClipboard } from "@mantine/hooks";
import { isDarkMode } from "@/utils/functions";
import LandingPageArticles from "@/components/common/ArticleComponents";
import Link from "next/link";
import { ReactSVG } from "react-svg";

const SpiralImages = () => {
  const images = [
    "https://cryptologos.cc/logos/starknet-token-strk-logo.png?v=040",
    "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040",
    "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
    "https://cryptologos.cc/logos/tether-usdt-logo.png?v=040",
    "https://cryptologos.cc/logos/starknet-token-strk-logo.png?v=040",
    "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/33912.png",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/17445.png",
    "https://cryptologos.cc/logos/starknet-token-strk-logo.png?v=040",
    "https://assets.coingecko.com/coins/images/37715/standard/135474885.png?1715330450",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/18990.png",
    "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040"
  ];

  const [positions, setPositions] = useState<any>([
    {
      "top": "17.37053689711086%",
      "left": "71.71204415662163%"
    },
    {
      "top": "75.38718237806702%",
      "left": "42.494406243322004%"
    },
    {
      "top": "51.381132106391746%",
      "left": "61.091597114907415%"
    },
    {
      "top": "58.02176232423234%",
      "left": "35.02064148977546%"
    },
    {
      "top": "88.47769925764567%",
      "left": "16.558238417556765%"
    },
    {
      "top": "23.976833778368487%",
      "left": "52.10180994072367%"
    },
    {
      "top": "27.332111502508436%",
      "left": "14.60019824904169%"
    },
    {
      "top": "64.58169547480993%",
      "left": "81.02030051212577%"
    },
    {
      "top": "67.4935052567233%",
      "left": "30.766173258155707%"
    },
    {
      "top": "48.88366259227843%",
      "left": "51.41644219265763%"
    },
    {
      "top": "48.417725639096254%",
      "left": "28.73022815331229%"
    },
    {
      "top": "37.37415397900358%",
      "left": "39.5651359455689%"
    }
  ]);

  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  useEffect(() => {
    const newPositions = images.map(() => ({
      top: Math.random() * 80 + 10 + "%",
      left: Math.random() * 80 + 10 + "%",
    }));
    // console.log(newPositions)
    // setPositions(newPositions);
  }, []);

  return (
    <Box
      style={theme => ({
        position: "relative",
        width: "100%",
        minHeight: "400px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.radius.lg,
        background: isDark ? theme.colors.dark[9] : theme.colors.gray[0]
      })}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{
            position: "absolute",
            top: positions[i]?.top || "50%",
            left: positions[i]?.left || "50%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </Box>
  );
};

function ProjectTimeline() {
  const iconSize = "18px"
  const strokeSize = 1.5
  const tokenkitTimeline: ITimeline[] = [
    {
      title: "API for Assets on Starknet",
      icon: <IconApi size={iconSize} stroke={em(strokeSize)} />,
      description: "Unified access to token balances, transfers, and metadata",
      date: "2024 Q2"
    },
    {
      title: "Token Selection UI",
      icon: <IconComponents size={iconSize} stroke={em(strokeSize)} />,
      description: "Prebuilt component for seamless token integration in dApps",
      date: "2024 Q3"
    },
    {
      date: 'Q1 2024',
      title: 'Tokenkit Development Kickoff',
      description: 'Started development of Tokenkit, focusing on core token management.',
      icon: <IconCode size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q2 2024',
      title: 'Tokenkit Launch',
      description: 'Initial release with token creation, management, and basic analytics.',
      icon: <IconRocket size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q2 2024',
      title: 'Token Metadata Management',
      description: 'Support for updating and managing token metadata.',
      icon: <IconEdit size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q2 2024',
      title: 'API & SDK Release',
      description: 'Public API and SDK for seamless integration with dApps.',
      icon: <IconApi size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q3 2024',
      title: 'AI-Powered Notifications',
      description: 'Intelligent real-time alerts for token transfers and balance changes.',
      icon: <IconBell size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q4 2024',
      title: 'Advanced Analytics Dashboard',
      description: 'Customizable monitoring for asset performance and liquidity pools.',
      icon: <IconChartBar size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q1 2025',
      title: 'Multi-Chain Support',
      description: 'Expanded compatibility across EVM and non-EVM networks.',
      icon: <IconLayersIntersect size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q2 2025',
      title: 'On-Chain Token Discovery',
      description: 'Automated listing of newly deployed tokens for seamless ecosystem integration.',
      icon: <IconSearch size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q3 2025',
      title: 'Decentralized Token Registry',
      description: 'Permissionless token registry with community-driven governance.',
      icon: <IconDatabase size={iconSize} stroke={em(strokeSize)} />,
    },
    {
      date: 'Q4 2025',
      title: 'Starknet Indexing Integration',
      description: 'Improved data indexing for faster token retrieval and analytics.',
      icon: <IconServer size={iconSize} stroke={em(strokeSize)} />,
    },
  ];


  return (
    <Stack>
      <Title order={2} fw={400} size={"32px"}>Tokenkit Development Timeline</Title>
      <Text size="md">
        The Tokenkit Development Timeline outlines the progressive milestones in building Tokenkit, a robust token management solution. The timeline details the key phases, from initial development to future innovations, ensuring a seamless experience for developers and users in the blockchain ecosystem.
      </Text>

      <Timeline
        active={1}
        bulletSize={24}
        lineWidth={2}
        align="left"
        styles={{
          // itemBullet: { backgroundColor: theme.colors.blue[6] },
          // itemLine: { borderColor: theme.colors.gray[4] },
        }}
      >
        {tokenkitTimeline.map((item, index) => (
          <Timeline.Item
            key={index}
            title={item.title}
            bullet={item.icon}
          // lineVariant={index % 2 === 0 ? 'dashed' : 'solid'}
          >
            <Text color="dimmed" size="sm">
              {item.description}
            </Text>
            <Text size="xs" mt={4}>
              {item.date}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );
}

const ThemeCard = ({ theme, setCurrentTheme, title, activeTheme }: { activeTheme: Theme, title: string, theme: Theme, setCurrentTheme: (theme: Theme) => void }) => {
  const clipboard = useClipboard({ timeout: 500 });
  const mantineTheme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDark = isDarkMode(colorScheme)

  return (
    <Card
      bg={isDark ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[1]}
      radius={"lg"}
      style={{
        cursor: "pointer",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: JSON.stringify(activeTheme) === JSON.stringify(theme) ? theme.colors.primaryColor : "transparent"
      }}
    >
      <Stack align="center">
        <Box bg={theme.colors.background} h={"50px"} w={"50px"} style={{ borderRadius: "50%" }} />
        <Text fw={400} ta={"center"}>{`${title}`}</Text>
        <Group w={'100%'} justify="center" gap={"xs"}>
          <Button size="xs" onClick={() => setCurrentTheme(theme)} radius={"md"}
            variant="light">Select</Button>
          <Button size="xs" color={clipboard.copied ? 'teal' : 'blue'}
            onClick={() => clipboard.copy(JSON.stringify(theme, null, 4))} radius={"md"}>
            {clipboard.copied ? 'Copied' : 'Copy'}
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}

const TokenSelectionComponent = () => {
  const [selectToken, setSelectedToken] = useState<IToken | null>(null)
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.sunset)

  const predefinedThemes = [
    {
      title: "Dark",
      accessor: "dark",
    },
    {
      title: "Light",
      accessor: "light",
    },
    {
      title: "Blue",
      accessor: "blue",
    },
    {
      title: "Gradient",
      accessor: "gradient",
    },
    {
      title: "Sunset",
      accessor: "sunset",
    },
    {
      title: "Ocean",
      accessor: "ocean",
    },
    {
      title: "Monochrome",
      accessor: "monochrome",
    }
  ]

  return (
    <Grid>
      <Grid.Col span={{ md: 6 }}>
        <Stack>
          <Title order={2} fw={400} size={"32px"}>Tokenkit SDK</Title>
          <Text size="md">
            The Tokenkit tokens Ready SDK Toolkit for every Starknet dApp developer.
          </Text>
          <Text size="md">
            Style the tokens container/modal with your own theme, match your website!
          </Text>
          <SimpleGrid cols={{ md: 3 }}>
            {
              predefinedThemes.map(theme => (
                <ThemeCard key={`theme_${theme.accessor}`}
                  theme={themes[theme.accessor]}
                  title={theme.title} setCurrentTheme={setCurrentTheme}
                  activeTheme={currentTheme}
                />
              ))
            }
          </SimpleGrid>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ md: 6 }}>
        <TokenKitWrapper
          network="SN_SEPOLIA"
          mainnetAPIKey="saWsCXrZ.clM7UA9l0VMui6dYInUWlVXCYTo5428e"
          sepoliaAPIKey={'EeRumkN0.GbgE6z0Kfqq9U2RR8kIr91f1YfNLxJku'}
          themeObject={currentTheme}
          protocol='http'
          endpoint={"localhost:8000"}
        >
          <Stack align="center">

            {/* Tokens Modal */}
            <SelectTokenModal
              callBackFunc={(token: IToken) => setSelectedToken(token)}
              selectedToken={selectToken}
              modalHeight="95dvh"
              modalWidth="450px"
            >
              <Button radius={'xl'} variant="light">Click to Select Token</Button>
            </SelectTokenModal>
            <CodeHighlight code={JSON.stringify(selectToken, null, 4)} w={{ base: '99%', md: "90%" }} maw={{ base: '99%', md: "90%" }} language="js" style={{ borderRadius: "20px" }} />
            {/* Tokens Container */}
            <SelectTokenContainer
              callBackFunc={(token: IToken) => setSelectedToken(token)}
              selectedToken={selectToken}
              modalHeight="60dvh"
              modalWidth="400px"
            />
          </Stack>
        </TokenKitWrapper>
      </Grid.Col>
    </Grid>
  )
}


const SimpleCard = ({ title, description }: ISimpleCard) => {

  return (
    <Stack gap={6}>
      <Title order={4} fw={500}>{title}</Title>
      <Text size="md">{description}</Text>
    </Stack>
  )
}


interface ILandingPage {
  blogs: any[]
}

function LandingPage({ blogs }: ILandingPage) {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <Box pos="relative">
      <Stack py={"30px"} gap={80}>

        <Container size={"xl"} pos="relative">
          <Grid style={{ position: 'relative', zIndex: 1 }}>
            <Grid.Col span={{ md: 5 }}>
              <Stack mih={"400px"} justify="center">
                <Title order={1} fw={400} size={"32px"}>Unlock the Power of Starknet Tokens</Title>
                <Text size="md">
                  Starknet Tokenkit is a developer toolkit offering APIs and UI components to simplify token management on Starknet, enabling seamless integration of token selection, real-time data tracking, and AI-powered notifications.
                </Text>
                <CodeHighlightTabs
                  code={[
                    { fileName: "Yarn", icon: <IconBrandYarn color="cyan" size={"18px"} />, code: "yarn add starknet-tokenkit", language: 'bash' },
                    { fileName: 'npm', icon: <IconBrandNpm color="#ff0000a1" size={"18px"} />, code: "npm i starknet-tokenkit", language: 'bash' },
                  ]}
                  style={{ borderRadius: theme.radius.md, overflow: "hidden" }} fs={"40px"}
                />
                <CreateSubscriberForm />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ md: 7 }}>
              <Box pos={'relative'} h={'100%'}>
                <SpiralImages />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>

        <Container size={"xl"} pos="relative">
          <Grid>
            <Grid.Col span={{ md: 5 }}>
              <ReactSVG src="/images/svg/landing/dark/features-section.svg" style={{ opacity: 0.7 }} width={"100%"} height={"100%"} />
            </Grid.Col>
            <Grid.Col span={{ md: 7 }}>
              <Stack mih={"400px"} justify="center">
                <Title order={2} fw={400} size={"32px"}>Empowering Developers on Starknet</Title>
                <Text size="md">
                  At Tokenkit, our mission is to provide developers with seamless access to token data and intuitive tools that enhance their experience in building decentralized applications on Starknet. We aim to simplify token interactions for everyone.
                </Text>
                <SimpleGrid cols={2}>
                  <SimpleCard title="10000 Tokens" description="Over 10, 000 tokens managed effortlessly through our platform." />
                  <SimpleCard title="500 dApps" description="Supporting over 500 decentralized applications with our robust API." />
                  <SimpleCard title="100 Developers" description="Empowering 100 developers to create innovative solutions with ease." />
                  <SimpleCard title="50 Projects" description="Enabling 50 projects to launch successfully on Starknet." />
                </SimpleGrid>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Box style={{ position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
          <Container size={"xl"} style={{ position: 'relative', zIndex: 1 }}>
            {/* <ReactSVG className="svg-holder"
              src="/images/svg/landing/light/main-background.svg"
              style={{ opacity: 0.6, position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }} 
              width={"100%"} /> */}
            <Box h={"100%"} w={"100%"} style={{
              // backgroundColor: theme.colors.blue[5], 
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              background: "url(/images/svg/landing/dark/main-background.svg)",
              filter: "invert(47%) sepia(73%) saturate(2878%) hue-rotate(200deg) brightness(104%) contrast(97%)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              // backgroundBlendMode: "multiply"
            }}>

            </Box>
            <Grid>
              <Grid.Col span={{ md: 8 }}>
                <ProjectTimeline />
              </Grid.Col>
              <Grid.Col span={{ md: 4 }}>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Box>
          <Box bg={isDark ? theme.colors.dark[9] : theme.colors.violet[0]}>
            <Container size={"xl"}>
              <Grid>
                <Grid.Col span={{ md: 7 }}>
                  <Stack mih={"400px"} justify="center">
                    <Title order={2} fw={400} size={"32px"}>Simplify Token Selection with Tokenkit's Integrated SDK</Title>
                    <Text size="md">
                      Our token selection package offers a seamless and customizable UI component for Starknet dApps, making token selection effortless for users. Integrate it easily into your existing applications to enhance user experience and reduce development time.
                    </Text>
                    <SimpleGrid cols={2}>
                      <SimpleCard title="96%" description="Reduction in development time with easy integration." />
                      <SimpleCard title="101+" description="Tokens supported, making it versatile for various dApp needs." />
                    </SimpleGrid>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ md: 5 }}>
                  <ReactSVG src="/images/svg/landing/dark/articles-section.svg" opacity={0.7} height="400px" />
                </Grid.Col>
              </Grid>
            </Container>
          </Box>


          <Box style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
            <Container size={"xl"} py={"xl"} style={{ position: 'relative', zIndex: 1 }}>
              <Grid>
                {/* <Grid.Col span={{ md: 4 }}>
                  <ReactSVG src="/images/svg/landing/light/sdk-section.svg" style={{ opacity: 0.7, height: '100%' }} wrapper="span" />
                </Grid.Col> */}
                <Grid.Col span={{ md: 12 }}>
                  <TokenSelectionComponent />
                </Grid.Col>
              </Grid>
            </Container>
          </Box>

          <Box bg={isDark ? `linear-gradient(to right,rgb(12, 12, 12),rgb(34, 34, 34))` : `linear-gradient(to right,rgb(12, 12, 12),rgb(34, 34, 34))`} style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
            <Container size={"xl"} c={"white"} py={"60px"} style={{ position: 'relative', zIndex: 1 }}>
              <Grid>
                <Grid.Col span={{ md: 5 }}>
                  <Stack h={'100%'} justify="center" gap="md" style={{ overflow: "hidden" }}>
                    {/* <Image src={`/images/token-creation.webp`} radius={'lg'} /> */}
                    <ReactSVG className="svg-holder" src="/images/svg/landing/dark/token-management.svg" style={{ opacity: 0.5 }} width={'100%'} />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ md: 7 }}>
                  <Stack mih={"400px"} justify="center" h={'100%'}>
                    <Title order={2} fw={400} size={"32px"}>Create & Manage Tokens with Ease</Title>
                    <Text size="md">
                      TokenKit simplifies the creation of both Fungible and Non-Fungible tokens (NFTs) with our intuitive interfaces and APIs. Launch your own tokens on StarkNet with minimal technical knowledge and maximum flexibility. Access detailed documentation and support for all token creation processes.
                    </Text>
                    <List spacing={"sm"}>
                      <List.Item icon={<IconCoins stroke={em(1.5)} />}>
                        <Text size="md">Fungible Tokens: Create and manage tokens like ERC-20 with ease.</Text>
                      </List.Item>
                      <List.Item icon={<IconCoins stroke={em(1.5)} />}>
                        <Text size="md">Non-Fungible Tokens: Mint unique NFTs with customizable metadata.</Text>
                      </List.Item>
                      <List.Item icon={<IconCoins stroke={em(1.5)} />}>
                        <Text size="md">Smart Contracts: Deploy secure and efficient token contracts.</Text>

                      </List.Item>
                    </List>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>
        </Box>

        <Container size={"xl"}>
          <Grid>
            <Grid.Col span={{ md: 5 }}>
              <Title order={2} fw={400} size={"32px"}>
                Simplify Liquidity Pool Management with TokenKit's Robust API
              </Title>
            </Grid.Col>
            <Grid.Col span={{ md: 7 }}>
              <Stack justify="center">
                <Text size="md">
                  Tokenkit's API streamlines the complexities of managing liquidity pools for decentralized exchanges. Our tools ensure optimal performance, real-time updates, and enhanced user engagement, making liquidity management more efficient and accessible for developers on StarkNet.
                </Text>
                <SimpleGrid cols={2}>
                  <SimpleCard title="Real-Time" description="Access up-to-the-minute data on liquidity pool performance and activity." />
                  <SimpleCard title="Enhanced Control" description="Gain greater control over liquidity parameters and trading strategies." />
                </SimpleGrid>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Container size={"xl"} style={{ position: 'relative' }}>
          <Grid>
            <Grid.Col span={{ md: 7 }}>
              <Stack mih={"400px"} justify="center">
                <Title order={2} fw={400} size={"32px"}>Real-Time Notifications for Asset Activities and Event Tracking</Title>
                <Text size="md">
                  Stay informed with our advanced notification system. Get real-time alerts on asset activities, ensuring you’re always ahead of market changes and critical events within your StarkNet dApps.
                </Text>
                <SimpleGrid cols={2}>
                  <SimpleCard title="100%" description="Real-time alert delivery success rate." />
                  <SimpleCard title="24/7" description="Around-the-clock monitoring and support." />
                </SimpleGrid>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ md: 5 }}>
              {/* <Image src={`/images/real-time.png`} radius={'lg'} /> */}
              <ReactSVG className="svg-holder" src="/images/svg/landing/light/notifications-section.svg" style={{ opacity: 0.7 }} wrapper="span" />
            </Grid.Col>
          </Grid>
        </Container>

        <Box w={'100%'} style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
          <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>

          </Box>
          <Container size={"xl"} style={{ position: 'relative', zIndex: 1 }}>
            <Stack>
              <Group>
                <Stack>
                  <Title order={2} fw={400} size={"32px"} maw={600}>Unlocking the Future of Token Management</Title>
                  <Text size="md" maw={600}>
                    Insights on token standards, smart contracts, and blockchain innovations with Tokenkit.
                  </Text>
                </Stack>
                <Anchor component={Link} href={"/articles"}>
                  <Button rightSection={<IconArrowRight />} variant="outline" radius={"md"}>Read All</Button>
                </Anchor>
              </Group>
              <Box w={'100%'}>
                <Grid>
                  <Grid.Col span={{ md: 4 }}>
                    <ReactSVG src="/images/svg/landing/light/articles-section.svg" opacity={0.5} />
                  </Grid.Col>
                  <Grid.Col span={{ md: 8 }}>
                    <LandingPageArticles articles={blogs} />
                  </Grid.Col>
                </Grid>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </Box>
  );
}

export default LandingPage;