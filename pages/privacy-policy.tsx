import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper'
import { APP_NAME } from '@/utils/constants'
import { Box, Container, Stack, Text, Title, useMantineColorScheme, useMantineTheme, darken } from '@mantine/core'
import { isDarkMode } from '@/utils/functions'
import Head from 'next/head'

const PrivacyPolicy = () => {
    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()

    return (
        <>
            <Head>
                <title>{`${APP_NAME} - Privacy Policy`}</title>
            </Head>
            <Stack>
                <Box py={'70px'} bg={isDarkMode(colorScheme) ? darken(theme.colors[theme.primaryColor][9], 0.5) : theme.colors[theme.primaryColor][8]}>
                    <Title size={'52px'} ta={'center'} c="white">Privacy Policy</Title>
                    <Text size="lg" fw={500} c="white" ta={'center'}>How we handle your data</Text>
                </Box>
                <Container size="md" py="xl">
                    <Stack gap="xl">
                        <Box>
                            <Title order={2} mb="md">1. Information We Collect</Title>
                            <Text>
                                We collect information you provide directly to us, such as when you create an account, 
                                use our services, or contact us for support. This may include your wallet address, 
                                email address, and any other information you choose to provide.
                            </Text>
                        </Box>

                        <Box>
                            <Title order={2} mb="md">2. How We Use Your Information</Title>
                            <Text>
                                We use the information we collect to provide, maintain, and improve our services, 
                                to process transactions, to send you technical notices and support messages, 
                                and to respond to your comments and questions.
                            </Text>
                        </Box>

                        <Box>
                            <Title order={2} mb="md">3. Information Sharing</Title>
                            <Text>
                                We do not share your personal information with third parties except as described 
                                in this policy. We may share information with service providers who perform services 
                                on our behalf, or when required by law.
                            </Text>
                        </Box>

                        <Box>
                            <Title order={2} mb="md">4. Blockchain Data</Title>
                            <Text>
                                Please note that blockchain transactions are public by nature. Any transactions 
                                you make using our services will be visible on the Starknet blockchain and cannot 
                                be deleted or modified.
                            </Text>
                        </Box>

                        <Box>
                            <Title order={2} mb="md">5. Security</Title>
                            <Text>
                                We take reasonable measures to help protect your personal information from loss, 
                                theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                            </Text>
                        </Box>

                        <Box>
                            <Title order={2} mb="md">6. Contact Us</Title>
                            <Text>
                                If you have any questions about this Privacy Policy, please contact us at 
                                support@tokenkit.dev.
                            </Text>
                        </Box>
                    </Stack>
                </Container>
            </Stack>
        </>
    )
}

PrivacyPolicy.PageLayout = HeaderAndFooterWrapper
export default PrivacyPolicy
