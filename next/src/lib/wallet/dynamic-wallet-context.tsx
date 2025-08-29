"use client"

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"

import { AlgorandWalletConnectors } from "@dynamic-labs/algorand"
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin"
import { CosmosWalletConnectors } from "@dynamic-labs/cosmos"
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { FlowWalletConnectors } from "@dynamic-labs/flow"
import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api-core"
import { SolanaWalletConnectors } from "@dynamic-labs/solana"
import { StarknetWalletConnectors } from "@dynamic-labs/starknet"
import { SuiWalletConnectors } from "@dynamic-labs/sui"
import {
  isAccountAbstractionConnector,
  isDynamicWaasConnector,
  isEmbeddedConnector,
} from "@dynamic-labs/wallet-connector-core"
import { useTheme } from "next-themes"
import Link from "next/link"
import { WagmiProvider } from "wagmi"
import { APP_NAME, APP_URL, DYNAMIC_ENVIRONMENT_ID } from "../shared/constants"
import { wagmiConfig } from "./wagmi"

const DynamicWalletContext = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme()
  const dynamicTheme = resolvedTheme === "dark" ? "dark" : "light"
  return (
    <DynamicContextProvider
      theme={dynamicTheme}
      settings={{
        appName: APP_NAME,
        environmentId: DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [
          AlgorandWalletConnectors,
          BitcoinWalletConnectors,
          CosmosWalletConnectors,
          EthereumWalletConnectors,
          FlowWalletConnectors,
          SolanaWalletConnectors,
          StarknetWalletConnectors,
          SuiWalletConnectors,
        ],
        initialAuthenticationMode: "connect-only",
        policiesConsentInnerComponent: <Disclaimer />,
        privacyPolicyUrl: `${APP_URL}/privacy-policy`,
        overrides: {
          views: [
            {
              type: SdkViewType.Login,
              sections: [
                {
                  type: SdkViewSectionType.Wallet,
                },
              ],
            },
          ],
        },
        walletsFilter: (options) =>
          options.filter((opt) => {
            const connector = opt.walletConnector
            return (
              !isEmbeddedConnector(connector) &&
              !isDynamicWaasConnector(connector) &&
              !isAccountAbstractionConnector(connector)
            )
          }),
      }}
    >
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </DynamicContextProvider>
  )
}

export default DynamicWalletContext

const Disclaimer = () => (
  <div>
    By connecting your wallet, you agree to the{" "}
    <Link href={`${APP_URL}/terms-of-use`} target='_blank'>
      Terms of Service
    </Link>{" "}
    and acknowledge you have read and understand the protocol{" "}
    <Link href={`${APP_URL}/risk-disclosure-statement`} target='_blank'>
      Disclaimer
    </Link>
  </div>
)
