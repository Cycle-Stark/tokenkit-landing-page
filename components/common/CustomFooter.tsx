import { Box, Container, Divider, Grid, Group, Image, Stack, Text, Title, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import classes from '@/styles/footer.module.css'
import { isDarkMode } from '@/utils/functions'
import { APP_NAME } from '@/utils/constants'
import CreateSubscriberForm from '../forms/CreateSubscriberForm'

interface IFooterLink {
    title: string
    href: string
}
export const FooterLink = (props: IFooterLink) => {
    const { title, href } = props
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)

    return (
        <Text component={Link} href={href} className={classes.footer_link} size='sm'>{title}</Text>
    )
}

const CustomFooter = () => {
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)

    return (
        <Box style={{
            zIndex: 1,
            background: isDark ? `linear-gradient(to left,rgb(12, 12, 12),rgb(34, 34, 34))` : "inherit"
        }} pos={'relative'}>
            <Container py={"60px"} size={"xl"} style={{ zIndex: 2 }} pos={'relative'}>
                <Grid>
                    <Grid.Col span={{ md: 7 }}>
                        <Grid>
                            {/* <Grid.Col span={{ md: 4 }}>
                                <Box pr={{ md: "xl" }}>
                                    <Stack>
                                        <Image src={'/assets/images/icons/logo-whitepng.png'} w={'50%'} mx={'auto'} />
                                        <Text size='sm'>
                                            We build IOT sensors applications to enable precision agriculture for smallholder farmers. Grow Sustainably and Profitably.
                                        </Text>
                                    </Stack>
                                </Box>
                            </Grid.Col> */}
                            <Grid.Col span={{ md: 4 }}>
                                <Box pr={{ md: "xl" }}>
                                    <Stack gap={10}>
                                        <Title order={3}>Explore</Title>
                                        <FooterLink title='Api Documentation' href='/#about' />
                                        <FooterLink title='Token Creation' href='/#services' />
                                        <FooterLink title='Token Listing' href='/#faqs' />
                                        <FooterLink title='Notifications' href='/#faqs' />
                                    </Stack>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <Box pr={{ md: "xl" }}>
                                    <Stack gap={10}>
                                        <Title order={3}>Resources</Title>
                                        <FooterLink title='Liquidity Pools' href='/#about' />
                                        <FooterLink title='Fungile Tokens & NFTs' href='/#services' />
                                        <FooterLink title='News & Articles' href='/articles' />
                                    </Stack>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <Box pr={{ md: "xl" }}>
                                    <Stack gap={10}>
                                        <Title order={3}>Company</Title>
                                        <FooterLink title='About Us' href='/about-us' />
                                        <FooterLink title='FAQs' href='/#faqs' />
                                        <FooterLink title='Contact Us' href='/contact-us' />
                                        {/* <FooterLink title='Work with Us' href='/register' /> */}
                                        <Group>
                                            <Text fw={500} size='sm'>
                                                <strong>Email: </strong>
                                                <a className={classes.footer_info_link} href='mailto:info@rhea.africa'>info@tokenkithq.io</a>
                                            </Text>
                                        </Group>
                                    </Stack>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={{ md: 5 }}>
                        <Box pr={{ md: "xl" }}>
                            <Stack >
                                <Title order={3}>Subscribe</Title>
                                <Text size='sm'>Stay up-to-date with the latest Tokenkit news and Updates</Text>
                                <CreateSubscriberForm />
                            </Stack>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>
            <Divider color={isDark ? 'rgb(27, 27, 27)' : 'rgb(230, 230, 230)'} h={'1px'} />
            <Container size={'xl'} p="xs" style={{ zIndex: 2 }} pos={'relative'}>
                <Grid py="lg">
                    <Grid.Col span={{ md: 6 }}>
                        <Text size='sm'>&copy; {`${APP_NAME} ${new Date().getFullYear()} All rights reserved.`}</Text>
                    </Grid.Col>
                    <Grid.Col span={{ md: 6 }}>
                        <Group align='center' justify='end'>
                            <FooterLink title='Terms & Conditions' href='/' />
                            <FooterLink title='Privacy Policy' href='/privacy-policy' />
                            <FooterLink title='Support' href='/contact-us' />
                        </Group>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

export default CustomFooter