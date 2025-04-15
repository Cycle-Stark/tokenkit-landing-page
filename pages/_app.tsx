import React from 'react'
import NextApp, { AppProps, AppContext } from 'next/app';
import Head from 'next/head'
import { getCookie } from 'cookies-next'
import { MantineColorScheme } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './../styles/global.css'
import '@mantine/charts/styles.css';
import '@mantine/tiptap/styles.css';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './../styles/layout.css';
import '@mantine/code-highlight/styles.css';

import '@/styles/tiptap.css'
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';


import { APP_NAME, THEME_COOKIE_NAME } from '@/utils/constants';
import MainProvider from '@/providers/MainProvider';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<{ children: React.ReactNode }>,
  },
  colorScheme: MantineColorScheme,
  user: any,
  loginStatus: any,
}

export default function App({ Component, pageProps, colorScheme, loginStatus }: ComponentWithPageLayout) {
 
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" type="image/x-icon" href="/assets/images/icons/ico.png" />
      </Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6NMHF81YKR"
      />
      {/* Initialize gtag */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6NMHF81YKR');
            `,
        }}
      />
      <MainProvider colorScheme={colorScheme}>
        {
          Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          )
            :
            <Component {...pageProps} />
        }
      </MainProvider>
    </>
  );
}


App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  console.log("App props: ", appProps)
  // Fetch colorScheme from cookies
  const colorScheme = await getCookie(THEME_COOKIE_NAME, appContext.ctx) || 'light';
  return {
    ...appProps,
    colorScheme,
    // user: getCookie(LOCAL_STORAGE_KEYS.user, appContext.ctx) || null,
    // loginStatus: getCookie(LOCAL_STORAGE_KEYS.login_status, appContext.ctx) || false,
  };
};
