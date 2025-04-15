
import { CustomColorSchemeManager } from '@/components/ColorSchemeToggle/ColorSchemeManager';
import { theme } from '@/theme';
import { THEME_COOKIE_NAME } from '@/utils/constants';
import { MantineColorScheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import AppProvider from './AppProvider';

interface MainProviderProps {
    colorScheme: MantineColorScheme,
    children: React.ReactNode,
}

const MainProvider = ({ colorScheme, children }: MainProviderProps) => {
    return (
        <MantineProvider
            colorSchemeManager={CustomColorSchemeManager({ key: THEME_COOKIE_NAME })}
            defaultColorScheme={colorScheme}
            theme={theme} >
            <AppProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
                <Notifications position='bottom-right' transitionDuration={200} autoClose={3000} />
            </AppProvider>
        </MantineProvider>
    )
}

export default MainProvider