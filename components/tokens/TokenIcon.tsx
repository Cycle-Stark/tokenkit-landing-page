import React from 'react';
import { Avatar, Box, Image, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface TokenIconProps {
  symbol: string;
  size?: number;
  icon?: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ symbol, size = 36, icon }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';
  
  // Generate a consistent color based on the token symbol
  const getColorFromSymbol = (symbol: string) => {
    const colors = [
      theme.colors.violet[isDark ? 5 : 6],
      theme.colors.indigo[isDark ? 5 : 6],
      theme.colors.blue[isDark ? 5 : 6],
      theme.colors.teal[isDark ? 5 : 6],
      theme.colors.green[isDark ? 5 : 6],
      theme.colors.orange[isDark ? 5 : 6],
      theme.colors.pink[isDark ? 5 : 6],
    ];
    
    // Use the sum of character codes to pick a color
    const sum = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const bgColor = getColorFromSymbol(symbol);
  const textColor = isDark ? theme.white : theme.white;

  return (
    <Box
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.4,
        color: textColor,
        boxShadow: isDark ? `0 0 10px ${bgColor}40` : 'none',
      }}
    >
      {
        icon ? (
          <Image src={icon} height={size} width={size} />
        ) : (
          <Text
            style={{
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: size * 0.4,
              color: textColor,
            }}
          >
            {symbol.slice(0, 3).toUpperCase()}
          </Text>
        )
      }
    </Box>
  );
};

export default TokenIcon;
