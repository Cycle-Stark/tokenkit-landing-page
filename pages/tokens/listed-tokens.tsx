import CustomDataTable from '@/components/tables/filters/CustomDataTable'
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper'
import { API_ENDPOINTS, MAINNET_API_ROOT, SEPOLIA_API_KEY, SEPOLIA_API_ROOT } from '@/utils/constants'
import { Group, Stack, Text, Paper, Box, useMantineColorScheme, useMantineTheme, Badge } from '@mantine/core'
import { IconCoin, IconHash, IconNumbers, IconPhoto, IconStar } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import TokensPageWrapper from '@/components/tokens/TokensPageWrapper'
import TokenFilters from '@/components/tokens/TokenFilters'
import TokenIcon from '@/components/tokens/TokenIcon'
import TokenAddress from '@/components/tokens/TokenAddress'
import { convertToReadableTokens } from '@/utils/functions'
import { useDebouncedState } from '@mantine/hooks'

const ListedTokens = () => {
    const [network, setNetwork] = useState<string>("SN_SEPOLIA")
    const [search, setSearch] = useDebouncedState<string>("", 500)
    const [tokenType, setTokenType] = useState<string>("all")
    const [filters, setFilters] = useState<any>({is_listed: "true"})
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
    const isDark = colorScheme === 'dark'

    const getIcon = (isErc20: boolean, isErc721: boolean) => {
        if (isErc20 && isErc721) {
            return <Group>
                <IconCoin size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
                <IconPhoto size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
            </Group>
        }
        else if (isErc20) {
            return <IconCoin size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
        }
        else {
            return <IconPhoto size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
        }
    }

    // Update filters when search or token type changes
    useEffect(() => {
        const newFilters = { ...filters }
        
        // Update search filter
        if (search) {
            newFilters.search = search
        } else {
            delete newFilters.search
        }
        
        // Update token type filter
        if (tokenType === 'erc20') {
            newFilters.is_erc20 = 'true'
            delete newFilters.is_erc721
        } else if (tokenType === 'erc721') {
            newFilters.is_erc721 = 'true'
            delete newFilters.is_erc20
        } else {
            // All tokens
            delete newFilters.is_erc20
            delete newFilters.is_erc721
        }
        
        // Always keep is_listed filter
        newFilters.is_listed = "true"
        
        setFilters(newFilters)
    }, [search, tokenType])

    const getUrl = () => {
        if (network === "SN_SEPOLIA") {
            return `${SEPOLIA_API_ROOT}/${API_ENDPOINTS.LISTED_TOKENS}/`
        } else if (network === "SN_MAIN") {
            return `${MAINNET_API_ROOT}/${API_ENDPOINTS.LISTED_TOKENS}/`
        }
        return ""
    }

    return (
        <TokensPageWrapper 
            title="Listed Tokens" 
            description="Browse officially listed tokens on the Starknet blockchain"
        >
            <TokenFilters 
                network={network} 
                onNetworkChange={setNetwork}
                search={search}
                onSearchChange={setSearch}
                tokenType={tokenType}
                onTokenTypeChange={setTokenType}
            />
            
            <Paper 
                shadow="sm" 
                radius="lg" 
                p="md"
                style={{
                    background: isDark ? `rgba(26, 27, 30, 0.7)` : `rgba(255, 255, 255, 0.8)`,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <Box>
                    <CustomDataTable
                        url={getUrl()}
                        useDirectUrl={true}
                        method={'GET'}
                        tableHeight="50vh"
                        hideFilters={true}
                        defaultFilters={{
                            limit: '10',
                            ordering: 'id',
                            is_touched: "true",
                            fields: "name,symbol,address,decimals,totalSupply,is_erc20,is_erc721,is_listed,icon",
                            ...filters
                        }}
                        hideActionsColumn={true}
                        useNext={false}
                        formValidators={undefined}
                        hideUpdateActionBtn={true}
                        hideDeleteActionBtn={true}
                        updateData={{
                            formNode: <></>,
                            modalSize: 'lg',
                            updatingModalTitle: "Update Token",
                            deletingModalTitle: "Delete Token",
                            extraFormProps: {
                                is_admin: false
                            }
                        }}
                        columns={[
                            {
                                accessor: "token_info",
                                title: "Token",
                                width: "250px",
                                render: (item: any) => (
                                    <Group gap="xs" wrap="nowrap">
                                        <TokenIcon icon={item?.icon} symbol={item?.symbol || 'UNK'} />
                                        <Stack gap={0}>
                                            <Group gap="xs">
                                                <Text fw={600} size="sm">{item?.name}</Text>
                                                <Badge size="xs" color="green" variant="light">
                                                    <Group gap={4}>
                                                        <IconStar size={12} />
                                                        <Text size="xs">Listed</Text>
                                                    </Group>
                                                </Badge>
                                            </Group>
                                            <Group gap="4">
                                                {
                                                    getIcon(item?.is_erc20, item?.is_erc721)
                                                }
                                                <Text size="xs" c="dimmed">{item?.symbol}</Text>
                                            </Group>
                                        </Stack>
                                    </Group>
                                )
                            },
                            {
                                accessor: "address",
                                title: "Contract Address",
                                width: "250px",
                                render: (item: any) => (
                                    <TokenAddress address={item?.address} />
                                )
                            },
                            {
                                accessor: "decimals",
                                title: "Decimals",
                                width: "120px",
                                render: (item: any) => (
                                    <Group gap="xs">
                                        <IconNumbers size={16} color={isDark ? theme.colors.gray[5] : theme.colors.gray[6]} />
                                        <Text size="sm">{item?.decimals}</Text>
                                    </Group>
                                )
                            },
                            {
                                accessor: "totalSupply",
                                title: "Total Supply",
                                width: "200px",
                                render: (item: any) => (
                                    <Group gap="xs">
                                        <IconHash size={16} color={isDark ? theme.colors.gray[5] : theme.colors.gray[6]} />
                                        <Text size="sm" ff="monospace">
                                            {convertToReadableTokens(item.totalSupply, item.decimals)}
                                        </Text>
                                    </Group>
                                )
                            }
                        ]}
                        filterFields={[
                            {
                                accessor: 'limit',
                                label: 'Rows',
                                gridSize: 2,
                                placeholder: '10',
                                type: 'select',
                                options: [
                                    { value: '5', label: '5' },
                                    { value: '10', label: '10' },
                                    { value: '20', label: '20' },
                                    { value: '50', label: '50' },
                                    { value: '100', label: '100' },
                                ]
                            },
                            {
                                accessor: 'search',
                                label: 'Search',
                                gridSize: 4,
                                placeholder: 'Search by name, symbol, or address',
                                type: 'text'
                            },
                            {
                                accessor: 'ordering',
                                label: 'Sort By',
                                gridSize: 3,
                                placeholder: 'Select ordering',
                                type: 'select',
                                options: [
                                    {
                                        group: 'Ascending',
                                        items: [
                                            { value: 'name', label: 'Name' },
                                            { value: 'symbol', label: 'Symbol' },
                                            { value: 'decimals', label: 'Decimals' },
                                        ]
                                    },
                                    {
                                        group: 'Descending',
                                        items: [
                                            { value: '-name', label: 'Name' },
                                            { value: '-symbol', label: 'Symbol' },
                                            { value: '-decimals', label: 'Decimals' },
                                        ]
                                    }
                                ]
                            },
                        ]}
                    />
                </Box>
            </Paper>
        </TokensPageWrapper>
    )
}

ListedTokens.PageLayout = HeaderAndFooterWrapper
export default ListedTokens