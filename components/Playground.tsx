import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SelectTokenContainer } from 'starknet-tokenkit';
import { TokenKitWrapper } from 'starknet-tokenkit';

type ThemeMode = 'light' | 'dark';
type ColorScheme = 'blue' | 'purple' | 'white';
type BorderRadius = 'none' | 'small' | 'medium' | 'large';
type HeaderFooterStyle = 'lightMode' | 'darkMode' | 'gradientOne';
type FontFamily = 'DM Sans' | 'Inter' | 'Roboto' | 'System UI';
type SearchStyle = 'minimal' | 'outlined' | 'filled';
type PrimaryColorScheme = 'teal' | 'blue' | 'purple' | 'green';

interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  r: string;
  headerFooterBg: string;
  fontFamily: string;
  searchBackground: string;
  searchColor: string;
  searchBorderColor: string;
  searchFocusBorderColor: string;
  primaryColor: string;
}

// Helper function to adjust color opacity using hex
const adjustColorOpacity = (hex: string, opacity: number) => {
  // Calculate opacity value (0-255)
  const a = Math.round(opacity * 255);

  // Convert back to hex
  const hexOpacity = a.toString(16).padStart(2, '0');

  return `#${hex.slice(1, 7)}${hexOpacity}`;
};

const baseTheme: ThemeConfig = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  r: '20px',
  headerFooterBg: 'linear-gradient(to top right, #ccc, #ccc)',
  fontFamily: 'DM Sans',
  searchBackground: '#97F4EE75',
  searchColor: '#FFFFFF',
  searchBorderColor: '#0E062E00',
  searchFocusBorderColor: '#97F4EEFF',
  primaryColor: '#00615B',
};

const themeVariants = {
  light: { ...baseTheme },
  dark: {
    ...baseTheme,
    headerFooterBg: 'linear-gradient(to top right, #ccc, #ccc)',
    textColor: '#FFFFFF',
  },
};

const colorSchemes: Record<ColorScheme, { textColor: string }> = {
  blue: { textColor: '#1E40AF' },
  purple: { textColor: '#6B21A8' },
  white: { textColor: '#FFFFFF' },
};

const borderRadiusVariants: Record<BorderRadius, { r: string }> = {
  none: { r: '0px' },
  small: { r: '10px' },
  medium: { r: '20px' },
  large: { r: '30px' },
};

const headerFooterVariants: Record<HeaderFooterStyle, { headerFooterBg: string }> = {
  lightMode: { headerFooterBg: 'linear-gradient(to top right, #fff, #fff)' },
  darkMode: { headerFooterBg: 'linear-gradient(to top right, #000, #000)' },
  gradientOne: { headerFooterBg: 'linear-gradient(to top right, #FF757D, #A30CB5, #00173A)' }, // Using solid color as fallback
};

const fontFamilyVariants: Record<FontFamily, { fontFamily: string }> = {
  'DM Sans': { fontFamily: 'DM Sans' },
  'Inter': { fontFamily: 'Inter' },
  'Roboto': { fontFamily: 'Roboto' },
  'System UI': { fontFamily: 'system-ui' },
};

const getSearchStyleVariants = (primaryColor: string) => {
  return {
    minimal: {
      searchBackground: 'transparent',
      searchColor: 'inherit',
      searchBorderColor: adjustColorOpacity(primaryColor, 0.1),
      searchFocusBorderColor: primaryColor,
    },
    outlined: {
      searchBackground: 'transparent',
      searchColor: 'inherit',
      searchBorderColor: adjustColorOpacity(primaryColor, 0.2),
      searchFocusBorderColor: primaryColor,
    },
    filled: {
      searchBackground: adjustColorOpacity(primaryColor, 0.15),
      searchColor: adjustColorOpacity(primaryColor, 0.9),
      searchBorderColor: 'transparent',
      searchFocusBorderColor: primaryColor,
    },
  };
};

const primaryColorVariants: Record<PrimaryColorScheme, { primaryColor: string }> = {
  teal: { primaryColor: '#00615B' },
  blue: { primaryColor: '#1D4ED8' },
  purple: { primaryColor: '#6B21A8' },
  green: { primaryColor: '#16A34A' },
};

const RadioOption = ({ value, label, style }: { value: string; label: string; style?: string }) => (
  <div className="flex flex-col items-center">
    <RadioGroupItem value={value} id={`radio-${value}`} className={`w-10 h-10 border-4 border-white ${style}`} />
    <Label className='mt-4' htmlFor={`radio-${value}`}>{label}</Label>
  </div>
);

// const RadioOptionContainer = ({ value, label, style, children }: { value: string; label: string; style?:string; children: JSX.Element }) => (
//   <div className="flex flex-col items-center">
//     <RadioGroupItem value={value} id={`radio-${value}`} className={`w-10 h-10 border-4 border-white ${style}` } >{children}</RadioGroupItem>
//     <Label className='mt-4' htmlFor={`radio-${value}`}>{label}</Label>
//   </div>
// );

const Playground = () => {
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('white');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [borderType, setBorderType] = useState<BorderRadius>('medium');
  const [headerFooterStyle, setHeaderFooterStyle] = useState<HeaderFooterStyle>('gradientOne');
  const [fontFamily, setFontFamily] = useState<FontFamily>('DM Sans');
  const [searchStyle, setSearchStyle] = useState<SearchStyle>('filled');
  const [primaryColorScheme, setPrimaryColorScheme] = useState<PrimaryColorScheme>('purple');

  const currentPrimaryColor = primaryColorVariants[primaryColorScheme].primaryColor;
  const searchStyleVariants = getSearchStyleVariants(currentPrimaryColor);

  const currentTheme = {
    ...themeVariants[themeMode],
    ...colorSchemes[colorScheme],
    ...borderRadiusVariants[borderType],
    ...headerFooterVariants[headerFooterStyle],
    ...fontFamilyVariants[fontFamily],
    ...searchStyleVariants[searchStyle],
    ...primaryColorVariants[primaryColorScheme],
  };

  console.log(currentTheme)

  return (
    <section className="bg-[#030014]">
      <TokenKitWrapper
        network="SN_SEPOLIA"
        sepoliaAPIKey="DTbWuy4b.ms4tiwwpG5AYZSDYncUhynuqzQxzQwWG"
        mainnetAPIKey="WZqOZtjW.4WsDb93vXOfcfM2xGOCPAj8DvquaBTj9"
        themeObject={currentTheme}
      >
        <div className="flex flex-col gap-6 text-white">
          <SelectTokenContainer
            selectedToken={selectedToken}
            callBackFunc={setSelectedToken}
            modalHeight="600px"
          />
          <p className='text-center'>Selected Token</p>
          <div style={{whiteSpace: "pre", maxWidth: "450px", overflow: "hidden", margin: "auto", background: "rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "10px", fontSize: "14px"}}>
            {JSON.stringify(selectedToken, null, 4)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {/* Color Scheme */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Color Scheme</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={colorScheme}
                onValueChange={(value) => setColorScheme(value as ColorScheme)}
              >
                <RadioOption value="blue" label="Blue" style='fill-blue-500' />
                <RadioOption value="purple" label="Purple" style='fill-purple-500' />
                <RadioOption value="white" label="White" style='fill-white' />
              </RadioGroup>
            </div>

            {/* Theme Mode */}
            {/* <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Theme Mode</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={themeMode}
                onValueChange={(value) => setThemeMode(value as ThemeMode)}
              >
                <RadioOption value="light" label="Light" style='fill-white' />
                <RadioOption value="dark" label="Dark" style='fill-black' />
              </RadioGroup>
            </div> */}

            {/* Modal Theme */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Modal Theme</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={headerFooterStyle}
                onValueChange={(value) => setHeaderFooterStyle(value as HeaderFooterStyle)}
              >
                <RadioOption style='fill-white' value="lightMode" label="Light Mode" />
                <RadioOption style='fill-white' value="darkMode" label="Dark Mode" />
                <RadioOption style='fill-white' value="gradientOne" label="Gradient One" />
              </RadioGroup>
            </div>

            {/* Border Type */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Border Type</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={borderType}
                onValueChange={(value) => setBorderType(value as BorderRadius)}
              >
                <RadioOption style='fill-white' value="none" label="None" />
                <RadioOption style='fill-white' value="small" label="Small" />
                <RadioOption style='fill-white' value="medium" label="Medium" />
                <RadioOption style='fill-white' value="large" label="Large" />
              </RadioGroup>
            </div>

            {/* Font Family */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Font Family</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={fontFamily}
                onValueChange={(value) => setFontFamily(value as FontFamily)}
              >
                <RadioOption style='fill-white' value="DM Sans" label="DM Sans" />
                <RadioOption style='fill-white' value="Inter" label="Inter" />
                <RadioOption style='fill-white' value="Roboto" label="Roboto" />
                <RadioOption style='fill-white' value="System UI" label="System UI" />
              </RadioGroup>
            </div>

            {/* Search Style */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Search Style</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={searchStyle}
                onValueChange={(value) => setSearchStyle(value as SearchStyle)}
              >
                <RadioOption style='fill-white' value="minimal" label="Minimal" />
                <RadioOption style='fill-white' value="outlined" label="Outlined" />
                <RadioOption style='fill-white' value="filled" label="Filled" />
              </RadioGroup>
            </div>

            {/* Primary Color */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-5 text-center">Primary Color</h3>
              <RadioGroup
                className="flex flex-row justify-center"
                value={primaryColorScheme}
                onValueChange={(value) => setPrimaryColorScheme(value as PrimaryColorScheme)}
              >
                <RadioOption style='fill-white' value="teal" label="Teal" />
                <RadioOption style='fill-white' value="blue" label="Blue" />
                <RadioOption style='fill-white' value="purple" label="Purple" />
                <RadioOption style='fill-white' value="green" label="Green" />
              </RadioGroup>
            </div>
          </div>

          {/* Theme Preview */}
          <div className="mt-4 p-4 rounded-lg bg-white/10">
            <h3 className="text-sm font-medium mb-5 text-center">Current Theme:</h3>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(currentTheme, null, 2)}
            </pre>
          </div>
        </div>
      </TokenKitWrapper>
    </section>
  );
};

export default Playground;