import { isDarkMode } from '@/utils/functions'
import { Container, Paper, Title, useMantineColorScheme } from '@mantine/core'
import React from 'react'

interface ICustomHeading {
    title: String
}

const CustomHeading = ({ title }: ICustomHeading) => {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Paper style={theme => ({
            background: isDarkMode(colorScheme) ? theme.colors.dark[8] : theme.colors.gray[1]
        })} py={60}>
            <Container size={"md"}>
                <Title>{title}</Title>
            </Container>
        </Paper>
    )
}

export default CustomHeading