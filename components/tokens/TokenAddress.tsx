import React, { useState } from 'react';
import { Group, Text, Tooltip, ActionIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

interface TokenAddressProps {
  address: string;
}

const TokenAddress: React.FC<TokenAddressProps> = ({ address }) => {
  const [copied, setCopied] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Group gap="xs" wrap="nowrap">
      <Text
        size="sm"
        ff="monospace"
        c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
        style={{ 
          background: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
          padding: '4px 8px',
          borderRadius: theme.radius.sm,
        }}
      >
        {truncateAddress(address)}
      </Text>
      <Tooltip label={copied ? "Copied!" : "Copy address"} withArrow position="right">
        <ActionIcon 
          color={copied ? "green" : "gray"} 
          variant="subtle" 
          onClick={handleCopy}
          size="sm"
        >
          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default TokenAddress;
