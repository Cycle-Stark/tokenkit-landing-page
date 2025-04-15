import { AppShell, Burger, useMantineTheme, Group, NavLink, Anchor, Drawer, Stack, Box, useMantineColorScheme, Title, Container, Affix } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import HeaderLink from '../components/navigations/HeaderLink'
import Link from 'next/link'
import { showNotification } from '@mantine/notifications'
import { IconHome2, IconLogin, IconAlertCircle, IconLogout, IconUserCircle, IconInfoCircle, IconBriefcase, IconPhone, IconPlant2, IconLocation, IconRegistered } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import SidebarLink from '@/components/navigations/SidebarLink'
import CustomFooter from '@/components/common/CustomFooter'
import { useAppContext } from '@/providers/AppProvider'
import { matchTest, isDarkMode } from '@/utils/functions'
import ColorSchemeToggle from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import { APP_NAME } from '@/utils/constants'
import { CustomDrawerLinkProps } from '@/utils/types'


const CustomDrawerLink = (props: CustomDrawerLinkProps) => {
    const { label, href, icon, children, loginRequired, click } = props
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    const router = useRouter()

    const match = () => {
        const path = router.asPath
        return matchTest(path, href)
    }

    return (
        <>
            {
                children && children.length > 0 ? (
                    <NavLink label={label} leftSection={icon}>
                        {
                            children?.map((child: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_child_${label}_${i}`} {...child} />
                            ))
                        }
                    </NavLink>
                ) : (
                    <Anchor component={Link} href={href} fw={500} passHref c={match() ? "red" : isDarkMode(colorScheme) ? theme.colors.gray[0] : theme.colors.dark[6]}>
                        <NavLink leftSection={icon} label={label} onClick={click} />
                    </Anchor>
                )
            }
        </>
    )
}

const navlinks: CustomDrawerLinkProps[] = [
    { label: 'Home', href: '/', icon: <IconHome2 /> },
    { label: 'Launch Token', href: '/launch-token', icon: <IconPhone /> },
    { label: 'List Token', href: '/list-token', icon: <IconBriefcase /> },
    {
        label: 'Tokens', href: '#',
        icon: <IconLocation />,
        children: [
            { label: 'Listed Tokens', href: '/tokens/listed-tokens', icon: <IconPhone /> },
            { label: 'All Tokens', href: '/tokens/all-tokens', icon: <IconPhone /> },
            // { label: 'Fungible Tokens', href: '/tokens/all-tokens', icon: <IconPhone /> },
            // { label: 'Non-Fungible Tokens (NFTs)', href: '/tokens/all-tokens', icon: <IconPhone /> },
        ]
    },
    { label: 'SDK', href: process.env.NEXT_PUBLIC_SDK_URL ?? "#", icon: <IconInfoCircle />, isExternal: true },
    { label: 'API', href: process.env.NEXT_PUBLIC_API_URL ?? "#", icon: <IconInfoCircle />, isExternal: true },
    {
        label: 'Documentation', href: '#',
        icon: <IconPlant2 />,
        children: [
            { label: 'SDK Documentation', href: process.env.NEXT_PUBLIC_SDK_DOCUMENTATION ?? "#", icon: <IconPhone />, isExternal: true },
            { label: 'API Documentation', href: process.env.NEXT_PUBLIC_API_DOCUMENTATION ?? "#", icon: <IconPhone />, isExternal: true },
        ]
    },
    { label: 'Articles', href: '/articles', icon: <IconPlant2 /> },
    // { label: 'Admin', href: '/ad', icon: <IconHome2 /> },
]



const accountLinks: CustomDrawerLinkProps[] = [
    {
        label: "Login",
        href: "/auth/login",
        icon: <IconLogin />,
        loginRequired: false
    },
]

export const LogoutLink = () => {

    const handleLogout = () => {
        showNotification({
            title: "Account logout",
            message: "You have logged out successfully",
            color: "blue",
            icon: <IconAlertCircle />
        })
    }

    return (
        <NavLink leftSection={<IconLogout />} label={'Logout'}
            onClick={handleLogout} />
    )
}

interface NavbarAndFooterWrapperProps {
    children: React.ReactNode
}

const HeaderAndFooterWrapper = ({ children }: NavbarAndFooterWrapperProps) => {

    const [opened, setOpened] = useState(false);
    const [activeAddress, setActiveAddress] = useState<string | null>(null)
    const closeDrawer = () => setOpened((o) => !o)
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)


    const { address } = useAppContext()

    const theme = useMantineTheme();
    const matches = useMediaQuery('(max-width: 768px)');

    useEffect(() => {

        if (address !== null) {
            setActiveAddress(address)
        }
        else {
            setActiveAddress(null)
        }
    }, [address])

    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    // backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : "red",
                    background: isDark ? `linear-gradient(to right,rgb(12, 12, 12),rgb(34, 34, 34))` : theme.white,
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}
            navbar={{
                breakpoint: 'md',
                width: { sm: 200, lg: 300, xs: 120 },
                collapsed: { desktop: true, mobile: !opened }
            }}
            padding={0}
            header={{
                height: { base: 60, md: 70 }
            }}
            pos={"relative"}
        >
            <AppShell.Header withBorder={false} style={{
                background: isDarkMode(colorScheme) ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
            }} w={"100vw"}>
                <Container size={'xl'} className='h-100'>
                    <Group justify='space-between' className='h-100' align='center'>
                        <Group className='h-100' align='center'>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                hiddenFrom='md'
                            />
                            <Anchor component={Link} href={'/'} c={isDarkMode(colorScheme) ? theme.colors.gray[1] : theme.colors.dark[8]}>
                                <Title order={2} fw={500}>{APP_NAME}</Title>
                            </Anchor>
                            {/* <Image src={"/assets/images/icons/logo.png"} mah={'100%'} /> */}
                        </Group>

                        <Group align='center' visibleFrom='md'>
                            {navlinks.map((link: CustomDrawerLinkProps, i: number) => (
                                <HeaderLink key={`header_link_${i}`} {...link} />
                            ))}
                        </Group>
                        <Group gap={4}>
                            {/* <AccountBtn /> */}
                            <ColorSchemeToggle />
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section p="lg">
                    <Stack gap={0}>
                        {navlinks.map((linkInfo: CustomDrawerLinkProps, i: number) => (
                            <SidebarLink key={`drawer_link_${i}`} {...linkInfo} click={closeDrawer} />
                        ))}
                        <SidebarLink label='Join Us' href='/register' icon={<IconRegistered />} click={closeDrawer} />
                    </Stack>
                    <NavLink label="Account" leftSection={<IconUserCircle />}>
                        {address ? (
                            <>
                                {accountLinks.filter(e => e.loginRequired === true).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                    <SidebarLink key={`drawer_link_loggedin_${i}`} {...linkInfo} click={closeDrawer} />
                                ))}
                                <LogoutLink />
                            </>
                        ) : (
                            <>
                                {accountLinks.filter(e => e.loginRequired === false).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                    <SidebarLink key={`drawer_link_account_${i}`} {...linkInfo} click={closeDrawer} />
                                ))}
                            </>
                        )}
                    </NavLink>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main style={{ zIndex: 2 }}>
                <div style={{ minHeight: "100vh" }}>
                    {children}
                </div>
            </AppShell.Main>
            <AppShell.Footer withBorder={false} pos={'static'}>
                <CustomFooter />
            </AppShell.Footer>
        </AppShell>
    )
}

export default HeaderAndFooterWrapper