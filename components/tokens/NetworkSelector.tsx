import React from 'react';
import { SegmentedControl, Group, Box, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconWorldWww } from '@tabler/icons-react';

interface NetworkSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ value, onChange }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box
      style={{
        marginBottom: '1.5rem',
        background: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
        padding: '12px 16px',
        borderRadius: theme.radius.md,
        border: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[2]}`,
      }}
    >
      <Group justify="apart" align="center">
        <Group>
          <IconWorldWww size={20} color={isDark ? theme.colors.violet[4] : theme.colors.violet[6]} />
          <Box style={{ fontWeight: 500 }}>Network</Box>
        </Group>
        
        <SegmentedControl
          value={value}
          onChange={onChange}
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
      </Group>
    </Box>
  );
};

export default NetworkSelector;
