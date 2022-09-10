import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createTheme } from "@nextui-org/react"
import Navbar from '../components/Navbar'
import React, { FC, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import SideOpts from '../components/SideOpts';
import useWalletHook from '../libs/useWalletHoot';
import { useRouter } from 'next/router';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {}, // optional
    }
  })
  
  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {}, // optional
    }
  })

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
          <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
              light: lightTheme.className,
              dark: darkTheme.className
            }}
          >
            <NextUIProvider >
               <Navbar/>
               <div className="w-full float-left">
                 <div className='flex justify-center items-center w-full h-100vh lg:hidden'>
                   Please Open in Your Laptop/Desktop
                 </div>
            <div className="sideOpts float-left hidden lg:block w-[300px]">
              <SideOpts />
            </div>
            {/* <div className="sideOpts float-left hidden lg:block w-[90px]">
              <MinimizedSideOpts />
            </div> */}
            <div className="float-left child-components hidden lg:block">
              <Component {...pageProps} />
            </div>
          </div>
            </NextUIProvider>
            </NextThemesProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    )
}

export default MyApp
