import { Paper, Title, Button, Text, Card, useMantineTheme, Group, Stack, Anchor, Image, Box, useMantineColorScheme, SimpleGrid, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { isDarkMode } from "@/utils/functions";
import Marquee from "react-fast-marquee";
// import classes from '@/styles/article-card.module.css'

interface CardProps {
  id: any
  slug: any
  image: string;
  title: string;
  description: string;
  categories: any;
}

function ArticleCard({ id, slug, image, title, categories, description }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="md"
      radius="lg"
      style={{
        // background: `url(${image}) center center / cover no-repeat fixed, linear-gradient(0deg, rgb(7 30 4 / 84%), rgb(0 0 0 / 28%))`,
        backgroundBlendMode: 'multiply',
        height: "100%"
      }}
    >
      <Stack gap={10}>
        <Box h={'160px'}>
          <Image src={image} radius={"md"} />
        </Box>
        <Text size="xs" lineClamp={2} h={"calc(1.4em * 2)"}>
          {
            categories?.map((cat: any) => cat?.title).join(" | ")
          }
        </Text>
        <Title order={3} lineClamp={3} h={"calc(1.4em * 3)"} >
          {title}
        </Title>
        <Text size="sm" lineClamp={4} ta={"justify"} h={"calc(1.4em * 4)"}>
          {description}
        </Text>
        <Anchor component={Link} href={`/articles/${id}/${slug}`} ta={"end"}>
          <Button radius={"md"} rightSection={<IconArrowRight />} variant="light">
            Read article
          </Button>
        </Anchor>
      </Stack>
    </Paper>
  );
}


export const SidebarArticleCard = ({ id, slug, image, title, categories }: CardProps) => {
  return (
    <Anchor component={Link} href={`/articles/${id}/${slug}`}>
      <Card radius={'md'}>
        <Group wrap="nowrap" >
          <Image src={image} radius={'md'} w={'80px'} />
          <Title size={'md'} order={3} fw={400}>{title}</Title>
        </Group>
      </Card>
    </Anchor>
  )
}



interface ILandingPageArticles {
  articles: any[]
}


function LandingPageArticles(props: ILandingPageArticles) {
  const { articles } = props
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { colorScheme } = useMantineColorScheme()

  // const slides = articles?.map((item: any) => (
  //   <Carousel.Slide key={item.title} p={{ base: "10px", sm: "md" }}>
  //     <ArticleCard {...item} />
  //   </Carousel.Slide>
  // ));

  // const slides = articles?.map((item: any) => (
  //   <Box key={item.title} p={{ base: "10px", sm: "md" }}
  //     w={{ base: "100vw", sm: "300px", md: "320px", lg: "320px" }}
  //     // w={"300px"}
  //     maw={"100dvw"}
  //   >
  //     <ArticleCard {...item} />
  //   </Box>
  // ));


  const slides = articles?.map((item: any) => (
    <Grid.Col key={item.title} span={{md: 4}}>
      <ArticleCard {...item} />
    </Grid.Col>
  ));


  return (
    <>
      {/* <Carousel
        // ref={autoplay}
        slideSize={{ base: '100%', md: '33.33%', lg: "25%" }}
        // breakpoints
        // slideGap={{ base: 'sm', sm: 2 }}
        align="center"
        loop
        draggable

      // slidesToScroll={3}
      // plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
      >
        {slides}
      </Carousel> */}
      {/* <Marquee
        speed={50} gradient={true}
        gradientColor={isDarkMode(colorScheme) ? theme.colors.dark[9] : theme.colors.gray[0]} style={{
          borderRadius: "20px"
        }}
        loop={0}
        pauseOnHover
      >
        {slides}
      </Marquee> */}
      <Grid>
        {slides}
      </Grid>
    </>
  );
}

export { ArticleCard }

export default LandingPageArticles