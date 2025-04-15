import { LINK_WEIGHT } from '@/utils/constants';
import { matchTest, isDarkMode } from '@/utils/functions';
import { CustomDrawerLinkProps } from '@/utils/types';
import { Anchor, Center, em, Group, Menu, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconChevronDown, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'


const HeaderLink = ({ label, href, icon, children, isExternal }: CustomDrawerLinkProps) => {
    const theme = useMantineTheme()
    const router = useRouter()
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)


    const match = () => {
        const path = router.asPath
        return matchTest(path, href)
    }

    const menuItems = children?.map((item) => (
        <Menu.Item key={item.href}
            component={Link} href={item.href}
            rightSection={item.isExternal ? <IconExternalLink size={"22px"} stroke={em(1.5)} /> : null}
        >
            <Text size='sm'>
                {item.label}
            </Text>
        </Menu.Item>
    ));

    if (menuItems) {
        return (
            <Menu key={label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal width={"180px"} radius={"md"}>
                <Menu.Target>
                    <Group gap={6} style={{ cursor: "pointer" }} mr="xl">
                        <Text
                            c={match() ? isDark ? theme.colors[theme.primaryColor][9] : theme.colors[theme.primaryColor][5] : isDarkMode(colorScheme) ? theme.white ?? "red" : theme.colors.dark[6]}
                            size="sm" fw={LINK_WEIGHT}>
                            {label}
                        </Text>
                        <IconChevronDown size={14} stroke={1.5} />
                    </Group>
                </Menu.Target>
                <Menu.Dropdown py={"sm"}>{menuItems}</Menu.Dropdown>
            </Menu>
        );
    }


    return (
        <Anchor href={href} component={Link} mr="xl"
            c={match() ? isDark ? theme.colors[theme.primaryColor][9] : theme.colors[theme.primaryColor][5] : isDarkMode(colorScheme) ? theme.white ?? "red" : theme.colors.dark[6]}
            size="sm" fw={LINK_WEIGHT}>
           <Group gap={6} style={{ cursor: "pointer" }}>
            {label}
            {
             isExternal ? <IconExternalLink size={"18px"} stroke={em(1.5)} /> : null   
            }
           </Group>
        </Anchor>
    )
}

export default HeaderLink