import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { disconnect, connect } from 'starknetkit';
import { modals } from '@mantine/modals';
import { Box, Button, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useSnapshot } from 'valtio';
import { RpcChannel, RpcProvider } from 'starknet';
import { showNotification } from '@mantine/notifications';
import appState from '@/utils/storage';
import { bigintToShortStr } from '@/utils/functions';
import { IconAlertTriangle } from '@tabler/icons-react';
import { setCookie } from 'cookies-next';
import { MAINNET_API_KEY, SEPOLIA_API_KEY } from '@/utils/constants';
;

interface IAppContext {
    provider: any;
    switchNetwork: (connection: any, chainId: 'SN_MAIN' | 'SN_SEPOLIA') => void;
    account: any;
    address: string;
    chainId: string;
    token: string;
    connectedWallet: string;
    connection: any;
    handleConnectWalletBtnClick: () => void;
    isSmallScreen: boolean;
}

const initialData: IAppContext = {
    provider: null,
    switchNetwork: () => { },
    account: null,
    address: '',
    chainId: 'SN_SEPOLIA',
    token: "",
    connectedWallet: '',
    connection: null,
    handleConnectWalletBtnClick: () => { },
    isSmallScreen: false,
};

export const cookieSetter = (cookie_name: any, value: any) => {
    setCookie(cookie_name, value, { maxAge: 60 * 60 * 24 * 30 })
}

export const AppContext = createContext<IAppContext>(initialData);

export const useAppContext = () => useContext(AppContext);

interface IAppProvider {
    children: ReactNode;
}

const AppProvider = ({ children }: IAppProvider) => {
    const [provider, setProvider] = useState<any>(null);
    const [chainId, setChainId] = useState<string>('SN_SEPOLIA');
    const [connectedWallet, setConnectedWallet] = useState<string>('');
    const [connection, setConnection] = useState<any>(null);
    const [account, setAccount] = useState<any>(null);
    const [address, setAddress] = useState<string>('');
    const [isSmallScreen, setIsSmallScreen] = useState<any>(false);
    const [accessToken, setAccessToken] = useState<string>("")

    const [opened, { open, close }] = useDisclosure(false);
    const matches = useMediaQuery('(max-width: 768px)');

    const snap = useSnapshot(appState, { sync: true });

    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[a-zA-Z0-9-_.~!*'();:@&=+$,%#]+)*\/?$/;

    const form = useForm({
        initialValues: {
            rpc_mainnet: snap.mainnetRPCEndpoint ?? "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
            rpc_sepolia: snap.sepoliaRPCEndpoint ?? "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
        },
        validate: {
            rpc_mainnet: (value: string) =>
                value === '' || value === null
                    ? 'Mainnet RPC endpoint is required!'
                    : !urlRegex.test(value)
                        ? 'Enter valid URL!'
                        : null,
            rpc_sepolia: (value: string) =>
                value === '' || value === null
                    ? 'Sepolia RPC endpoint is required!'
                    : !urlRegex.test(value)
                        ? 'Enter valid URL!'
                        : null,
        },
    });

    // This function works with latest versions of starknet and starknetkit
    // const connectWalletLatestVersionsofStarknetAndStarknetKit = async (modalMode: "canAsk" | "alwaysAsk" | "neverAsk" | undefined = "canAsk") => {
    //     if (!form.values.rpc_mainnet || !form.values.rpc_sepolia) {
    //         showNotification({ message: 'RPC endpoints required for connection.' });
    //         return;
    //     }

    //     const RPC_ENDPOINT = chainId === 'SN_SEPOLIA' ? form.values.rpc_sepolia : form.values.rpc_mainnet;
    //     const provider = new RpcProvider({ nodeUrl: RPC_ENDPOINT });
    //     const connection: any = await connect({
    //         dappName: 'Tokenkit',
    //         modalMode: modalMode,
    //     })

    //     const connectorNetwork: any = connection.connectorData?.chainId
    //     const actualNetwork = bigintToShortStr(connectorNetwork)

    //     if (actualNetwork !== chainId) {
    //         showNotification({
    //             message: `Kindly switch your wallet network to ${chainId} Manually and try reconnect. You are currently connected to ${actualNetwork}`,
    //             color: "indigo",
    //             icon: <IconAlertTriangle />,
    //             autoClose: 3000,
    //         })
    //         return
    //     }

    //     if (connection) {
    //         // const _account: any = connection.wallet?.account
    //         const account__ = await connection?.connector?.account()
    //         const rpcChannel = new RpcChannel({ nodeUrl: RPC_ENDPOINT })
    //         account__.channel = rpcChannel
    //         setAccount(account__)
    //         setConnectedWallet(connection?.wallet?.id!!);
    //         setConnection(connection);
    //         setAddress(`${connection?.connectorData?.account}`);
    //         setProvider(provider);

    //         appState.mainnetRPCEndpoint = form.values.rpc_mainnet;
    //         appState.sepoliaRPCEndpoint = form.values.rpc_sepolia;
    //     }
    //     close();
    // };

    const disconnectWallet = async () => {
        await disconnect({ clearLastWallet: false });
        setConnection(null);
        setAccount(null);
        setAddress('');
        setProvider(null);
        setConnectedWallet('');
    };

    const connectWallet = async (modalMode: "canAsk" | "alwaysAsk" | "neverAsk" | undefined = "canAsk") => {
        if (!form.values.rpc_mainnet || !form.values.rpc_sepolia) {
            showNotification({ message: 'RPC endpoints required for connection.' });
            return;
        }

        const RPC_ENDPOINT = chainId === 'SN_SEPOLIA' ? form.values.rpc_sepolia : form.values.rpc_mainnet;
        const provider = new RpcProvider({ nodeUrl: RPC_ENDPOINT });
        const connection = await connect({
            webWalletUrl: 'https://web.argent.xyz',
            dappName: 'Tokenkit',
            modalMode: modalMode,
            resultType: 'wallet',
            provider: provider
        });

        if (connection?.wallet?.id === "braavos") {
            const connectorNetwork: any = connection.wallet?.chainId ?? "0x534e5f5345504f4c4941"
            const actualNetwork = bigintToShortStr(connectorNetwork)

            if (actualNetwork && actualNetwork !== chainId) {
                showNotification({
                    message: `Kindly switch your wallet network to ${chainId} Manually and try reconnect. You are currently connected to ${actualNetwork}`,
                    color: "indigo",
                    icon: <IconAlertTriangle />,
                    autoClose: 3000,
                })
                disconnectWallet()
                return
            }

        } else {

            const connectorNetwork: any = connection.wallet?.chainId

            if (connectorNetwork !== chainId) {
                showNotification({
                    message: `Kindly switch your wallet network to ${chainId} Manually and try reconnect. You are currently connected to ${connectorNetwork}`,
                    color: "indigo",
                    icon: <IconAlertTriangle />,
                    autoClose: 3000,
                })
                return
            }
        }

        if (connection) {
            // const _account: any = connection.wallet?.account
            const account__ = await connection?.connector?.account()
            // const rpcChannel = new RpcChannel({ nodeUrl: RPC_ENDPOINT })
            // account__.channel = rpcChannel
            setAccount(account__)
            setConnectedWallet(connection?.wallet?.id!!);
            setConnection(connection);
            setAddress(`${connection?.wallet?.account?.address}`);
            setProvider(provider);

            appState.mainnetRPCEndpoint = form.values.rpc_mainnet;
            appState.sepoliaRPCEndpoint = form.values.rpc_sepolia;
        }
        close();
    };

    const switchNetwork = async (connection: any, newChainId: 'SN_MAIN' | 'SN_SEPOLIA' = 'SN_SEPOLIA') => {

        setChainId(newChainId);
        appState.activeChainId = newChainId;


    };

    const openConfirmDisconnectModal = () =>
        modals.openConfirmModal({
            title: 'You are about to disconnect your wallet!',
            centered: true,
            radius: 'md',
            children: <Text size="sm">Are you sure you want to disconnect your account?</Text>,
            labels: { confirm: 'Disconnect', cancel: 'Cancel' },
            confirmProps: { radius: 'md', variant: 'light' },
            cancelProps: { radius: 'md', variant: 'light' },
            onCancel: () => { },
            onConfirm: () => disconnectWallet(),
        });

    const handleConnectWalletBtnClick = () => {
        console.log(account)
        if (!account) {
            open();
        } else {
            openConfirmDisconnectModal();
        }
    };

    const contextValue = useMemo(
        () => ({
            switchNetwork,
            chainId,
            token: accessToken,
            connectedWallet,
            provider,
            account,
            address,
            connection,
            handleConnectWalletBtnClick,
            isSmallScreen,
        }),
        [account, address, connection, chainId, matches]
    );

    useEffect(() => {
        setIsSmallScreen(matches);
    }, [matches]);

    useEffect(() => {
        // connectWallet()
        setChainId(snap.activeChainId ?? 'SN_SEPOLIA');
    }, []);

    useEffect(() => {
        // if (connection) {
        //     console.log("change")
        //     connection?.wallet?.on({
        //         type: 'accountsChanged',
        //     }).then((res: any) => {
        //         console.log(res)
        //     }).catch((error: any) => {
        //         console.error(error)
        //     })
        // }
    }, [])

    useEffect(() => {
        if (chainId === "SN_SEPOLIA") {
            setAccessToken(`${SEPOLIA_API_KEY}`)
        } else if (chainId === "SN_MAIN") {
            setAccessToken(`${MAINNET_API_KEY}`)
        }
    }, [])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
            <Modal radius="md" opened={opened} onClose={close} size="lg" title="Connect with RPC">
                <form onSubmit={form.onSubmit(() => connectWallet())}>
                    <Stack>
                        <TextInput
                            radius="md"
                            label="Mainnet RPC Endpoint"
                            placeholder="Enter Infura or Alchemy RPC Endpoint i.e., https://..."
                            {...form.getInputProps('rpc_mainnet')}
                        />
                        <TextInput
                            radius="md"
                            label="Sepolia RPC Endpoint"
                            placeholder="Enter Infura or Alchemy RPC Endpoint i.e., https://..."
                            {...form.getInputProps('rpc_sepolia')}
                        />
                        <Box>
                            <Button radius="md" type="submit">
                                Connect
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Modal>
        </AppContext.Provider>
    );
};

export default AppProvider;
