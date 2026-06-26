export const RELAY_APP_CONFIG = {
  // Recipient of the app fee (our fee-collecting address).
  APP: process.env.RELAY_CONFIG_RECIPIENT_ADDRESS!,
  // App fee in basis points — 100 = 1%.
  FEE: process.env.RELAY_CONFIG_FEE,
}
