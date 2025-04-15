import React, { useState } from 'react';
import { 
  SegmentedControl, 
  Group, 
  Box, 
  useMantineColorScheme, 
  useMantineTheme, 
  TextInput,
  Tabs,
  Flex,
  Stack
} from '@mantine/core';
import { 
  IconWorldWww, 
  IconSearch, 
  IconCoin, 
  IconPhoto, 
  IconFilter 
} from '@tabler/icons-react';

interface TokenFiltersProps {
  network: string;
  onNetworkChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  tokenType: string;
  onTokenTypeChange: (value: string) => void;
}

const TokenFilters: React.FC<TokenFiltersProps> = ({ 
  network, 
  onNetworkChange,
  search,
  onSearchChange,
  tokenType,
  onTokenTypeChange
}) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.currentTarget.value);
  };

  return (
    <Box
      style={{
        marginBottom: '1.5rem',
        background: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
        padding: '16px',
        borderRadius: theme.radius.md,
        border: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[2]}`,
      }}
    >
      <Stack gap="md">
        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          <Group>
            <IconWorldWww size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
            <Box style={{ fontWeight: 500 }}>Network</Box>
          </Group>
          
          <SegmentedControl
            value={network}
            onChange={onNetworkChange}
            data={[
              { label: 'Sepolia', value: 'SN_SEPOLIA' },
              { label: 'Mainnet', value: 'SN_MAIN' },
            ]}
            size="xs"
            radius="md"
            styles={{
              root: {
                background: isDark ? theme.colors.dark[6] : theme.white,
                border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
              },
              indicator: {
                background: isDark 
                  ? `linear-gradient(45deg, ${theme.colors.violet[9]}, ${theme.colors.indigo[9]})`
                  : `linear-gradient(45deg, ${theme.colors.violet[6]}, ${theme.colors.indigo[6]})`,
              },
              label: {
                '&[data-active]': {
                  color: isDark ? theme.white : theme.white,
                  fontWeight: 600,
                },
              },
            }}
          />
        </Flex>

        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          <Group>
            <IconFilter size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
            <Box style={{ fontWeight: 500 }}>Token Type</Box>
          </Group>
          
          <Tabs 
            value={tokenType} 
            onChange={(value) => onTokenTypeChange(value || 'all')}
            radius="md"
            variant="pills"
          >
            <Tabs.List>
              <Tabs.Tab 
                value="all" 
                leftSection={<IconCoin size={16} />}
                style={{
                  fontWeight: tokenType === 'all' ? 600 : 400,
                  background: tokenType === 'all' ? (isDark ? theme.colors.violet[9] : theme.colors.violet[6]) : 'transparent',
                  color: tokenType === 'all' ? theme.white : undefined,
                }}
              >
                All
              </Tabs.Tab>
              <Tabs.Tab 
                value="erc20" 
                leftSection={<IconCoin size={16} />}
                style={{
                  fontWeight: tokenType === 'erc20' ? 600 : 400,
                  background: tokenType === 'erc20' ? (isDark ? theme.colors.violet[9] : theme.colors.violet[6]) : 'transparent',
                  color: tokenType === 'erc20' ? theme.white : undefined,
                }}
              >
                ERC-20
              </Tabs.Tab>
              <Tabs.Tab 
                value="erc721" 
                leftSection={<IconPhoto size={16} />}
                style={{
                  fontWeight: tokenType === 'erc721' ? 600 : 400,
                  background: tokenType === 'erc721' ? (isDark ? theme.colors.violet[9] : theme.colors.violet[6]) : 'transparent',
                  color: tokenType === 'erc721' ? theme.white : undefined,
                }}
              >
                ERC-721
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Flex>

        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          <Group>
            <IconSearch size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
            <Box style={{ fontWeight: 500 }}>Search</Box>
          </Group>
          
          <TextInput
            placeholder="Search by name, symbol, or address"
            value={search}
            onChange={handleSearchChange}
            style={{ flexGrow: 1, maxWidth: '300px' }}
            radius="md"
            size="sm"
            rightSection={<IconSearch size={16} color={isDark ? theme.colors.gray[5] : theme.colors.gray[6]} />}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default TokenFilters;
