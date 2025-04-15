import React, { useEffect, useState } from 'react'
import { Container, Grid, Stack, Text, TextInput, Title, Divider, Image, Button, useMantineTheme, useMantineColorScheme, Card, NumberInput } from '@mantine/core'
import { isDarkMode, validateStarknetAddress, validateURL } from '@/utils/functions';
import { CustomImageDropzone, WalletConnectionAndFormSubmission } from './helpers';
import { useAppContext } from '@/providers/AppProvider';
import { useForm } from '@mantine/form';


const LaunchTokenComponent = () => {

    const [loading, setLoading] = useState(false)

    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)

    const { chainId, account } = useAppContext()
    console.log(account)

    const form = useForm({
        initialValues: {
            name: "",
            symbol: "",
            icon: "",
            decimals: 0,
        },
        validate: {
            name: val => {
                if (!val) {
                    return "Token name is required"
                }
            },
            symbol: val => {
                if (!val) {
                    return "Token Symbol is required"
                }
            },
            icon: val => {
                if (!val) {
                    return "Token icon is required"
                }
            },
            decimals: val => {
                if (!val || val === 0) {
                    return "Token decimal count are required"
                }
            }
        }
    })

    const handleIconUploadcallBack = (imageUrl: string) => {
        form.setFieldValue("icon", imageUrl)
    }

    useEffect(() => {
        if (!account) {
            setLoading(false)
        }
    }, [account])

    return (
        <>
            <Container size={"xl"} py={{ base: "10px", md: "40px" }}>
                <Grid>
                    <Grid.Col span={{ md: 5 }}>
                        <Card bg={isDark ? `linear-gradient(to right,rgb(12, 12, 12),rgb(34, 34, 34))` : theme.colors.gray[0]} radius={"lg"} py={"40px"} px={{ base: "10px", md: "40px" }}>
                            <Stack>
                                <Title order={2} mb={10} fw={500}>
                                    Launch Your Token on Starknet
                                </Title>
                                <Text size="md" mb={20}>
                                    Easily deploy and launch your token on Tokenkit. Customize settings, configure details, and make your token accessible to users in just a few clicks!
                                </Text>
                                <form>
                                    <Grid>
                                        <Grid.Col span={6}>
                                            <TextInput
                                                label="Name"
                                                description="The name of the token"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="Starknet Token"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <TextInput
                                                label="Symbol"
                                                description="The symbol of the token"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="STRK"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <NumberInput
                                                label="Decimals"
                                                description="The decimals of the token (Max 18)"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="18"
                                                hideControls={true}
                                                max={18}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextInput
                                                label="Icon"
                                                description="The icon url/address of the token"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="https://cryptologos.cc/logos/starknet-token-strk-logo.png?v=040"
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <Divider my="xs" size={"md"} color={isDark ? "blue.7" : "indigo.4"} label="OR" labelPosition="center" />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <CustomImageDropzone callBack={handleIconUploadcallBack} />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <WalletConnectionAndFormSubmission loading={loading} submitButtonTitle='Launch Token' />
                                        </Grid.Col>
                                    </Grid>
                                </form>
                            </Stack>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ md: 5 }}>
                        <Image src={"/images/tokens/tokens_ocean.png"} maw={{ base: '96%', md: '80%' }} mx={"auto"} />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

export default LaunchTokenComponent