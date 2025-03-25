import {
  useAccountNameQuery,
  useAccountNamesQuery,
} from "@cartridge/utils/api/cartridge";

export function useUsername({ address }: { address: string }) {
  const { data } = useAccountNameQuery(
    { address },
    {
      enabled: false,
      queryKey: ["username", address],
      refetchOnWindowFocus: false,
    },
  );

  return { username: data?.accounts?.edges?.[0]?.node?.username ?? "" };
}

export function useUsernames({ addresses }: { addresses: string[] }) {
  const { data } = useAccountNamesQuery(
    { addresses },
    {
      queryKey: ["usernames", addresses],
      refetchOnWindowFocus: false,
    },
  );

  return {
    usernames:
      data?.accounts?.edges?.map((edge) => ({
        username: edge?.node?.username,
        address: edge?.node?.controllers?.edges?.[0]?.node?.address,
      })) ?? [],
  };
}
