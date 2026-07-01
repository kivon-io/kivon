export const earnKeys = {
  all: ["earn"] as const,
  vault: () => [...earnKeys.all, "vault"] as const,
  rewards: (address?: string) =>
    [...earnKeys.all, "rewards", address ?? "anon"] as const,
}
