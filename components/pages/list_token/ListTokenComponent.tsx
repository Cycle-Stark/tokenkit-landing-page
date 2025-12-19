import React, { useEffect, useState } from 'react'
import { Container, Grid, Stack, Text, TextInput, Title, Divider, Image, useMantineTheme, useMantineColorScheme, Card } from '@mantine/core'
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import { isDarkMode, validateStarknetAddress, validateURL } from '@/utils/functions';
import { useForm } from '@mantine/form';
import { useAppContext } from '@/providers/AppProvider';
import { showNotification } from '@mantine/notifications';
import { Contract } from 'starknet';
import TOKENKIT_ABI from "@/assets/tokenkit_abi.json"
import { CustomImageDropzone, WalletConnectionAndFormSubmission } from './helpers';



const ListTokenComponent = () => {

    const [loading, setLoading] = useState(false)

    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)

    const { chainId, account } = useAppContext()
    console.log(account)

    const form = useForm({
        initialValues: {
            address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            icon: "https://static.starkscan.co/tokens/0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d/icons/QmRBHe2LVqHWsCDajGYT5jGDpSicbq4W68bSTEfJWow4Lg"
        },
        validate: {
            address: val => {
                if (!val) {
                    return "Address is required"
                }
                else if (!validateStarknetAddress(val)) {
                    return "A valid Starknet address is required"
                }
            },
            icon: val => {
                if (!val) {
                    return "Token Icon is required"
                }
                else if (!validateURL(val)) {
                    return "A valid url address is required"
                }
            }
        }
    })

    const handleListToken = () => {
        console.log("here", chainId)
        try {
            if (account && chainId) {
                console.log("We go")
                setLoading(true)
                let contractAddress = "0x467d26d0486e6be4b83ee4b8eaf43b25a7fdd19100ecf8ba420c077e20f9624"
                if (chainId === "SN_SEPOLIA") {
                    contractAddress = "0x5e9a1965c00b0fd04b78b61da0b2299c0730f85ce35ae124c79ccd4642f1dc5"
                }
                else {
                    contractAddress = "0x467d26d0486e6be4b83ee4b8eaf43b25a7fdd19100ecf8ba420c077e20f9624"
                }
                const contract = new Contract(TOKENKIT_ABI, contractAddress, account)


                const call_data: any = form.values
                call_data.icon_link = form.values.icon
                const myCall = contract.populate('add_token', [
                    form.values.address,
                    form.values.icon,
                ])

                contract.add_token(myCall.calldata, { parseResponse: false, parseRequest: false })
                    // account.execute([{
                    //     contractAddress: contractAddress,
                    //     entrypoint: 'add_token',
                    //     // calldata: myCall.calldata
                    // calldata: [
                    //     form.values.address,
                    //     form.values.icon,
                    // ]
                    // }], { parseResponse: false, parseRequest: false })
                    .then((_res: any) => {
                        showNotification({
                            title: 'Token Listing',
                            message: `Token Added Succesfully`,
                            color: 'green',
                            icon: <IconCheck />
                        })
                    }).catch((err: any) => {
                        console.log("Error: ", err?.message)
                        if (err?.message.includes("Token already exists")) {
                            showNotification({
                                title: 'Token listing failed',
                                message: `Token already listed`,
                                color: 'red',
                                variant: "filled",
                                icon: <IconAlertTriangle />
                            })
                        } else {
                            showNotification({
                                title: 'Token listing failed',
                                message: `${err?.message}`,
                                color: 'red',
                                variant: "filled",
                                icon: <IconAlertTriangle />
                            })
                        }

                    }).finally(() => {
                        setLoading(false)
                    })
            }
        }
        catch (error: any) {
            console.log("Error: ", error)
            setLoading(false)
        }

    }

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
                                    List Your Token on Tokenkit
                                </Title>
                                <Text size="md" mb={20}>
                                    Make your deployed token discoverable in the Tokenkit token selection container/modal. Submit its details and get it listed in just a few steps!
                                </Text>
                                <form onSubmit={form.onSubmit(values => handleListToken())}>
                                    <Grid>
                                        <Grid.Col span={12}>
                                            <TextInput
                                                label="Address"
                                                description="The address of the token"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
                                                {...form.getInputProps('address')}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <TextInput
                                                label="Icon"
                                                description="The icon url/address of the token"
                                                radius={"md"}
                                                size="sm"
                                                placeholder="https://cryptologos.cc/logos/starknet-token-strk-logo.png?v=040"
                                                {...form.getInputProps('icon')}
                                            />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <Divider my="xs" size={"md"} color={isDark ? "blue.7" : "indigo.4"} label="OR" labelPosition="center" />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <CustomImageDropzone callBack={handleIconUploadcallBack} />
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <WalletConnectionAndFormSubmission loading={loading} submitButtonTitle='List Token' />
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

export default ListTokenComponent