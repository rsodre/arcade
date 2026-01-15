import { useCallback, useMemo } from "react";
import { useAccount, useConnect } from "@starknet-react/core";
import { useMarketBalancesFetcher } from "@/hooks/marketplace-balances-fetcher";
import { DEFAULT_PRESET, DEFAULT_PROJECT } from "@/constants";
import { addAddressPadding, getChecksumAddress } from "starknet";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useArcade } from "@/hooks/arcade";
import {
  ERC1155_ENTRYPOINT,
  getEntrypoints,
} from "@/features/marketplace/items";
import type ControllerConnector from "@cartridge/connector/controller";
import { collectionOrdersAtom } from "@/effect/atoms";
import { useAtomValue } from "@effect-atom/atom-react";
import { useConnectionViewModel } from "@/features/connection";
import { useTokenContracts } from "@/effect/hooks/tokens";
import { CollectionType } from "@/effect/atoms/tokens";
import { useUsernameByAddress } from "@/effect/hooks/users";

export function useHandleBuyCallback(
  collectionAddress: string,
  tokenId: string,
): () => Promise<void> {
  const { connector } = useConnect();
  const { address, isConnected } = useAccount();
  const { onConnect, isConnectDisabled } = useConnectionViewModel();
  const { trackEvent, events } = useAnalytics();
  const { provider } = useArcade();

  const { balances } = useMarketBalancesFetcher({
    project: [DEFAULT_PROJECT],
    address: collectionAddress,
    tokenId,
  });
  const owner = useMemo(
    () =>
      balances && balances.length === 1
        ? addAddressPadding(balances[0].account_address)
        : "0x0",
    [balances],
  );

  const collectionOrders = useAtomValue(
    collectionOrdersAtom(collectionAddress),
  );

  const orders = useMemo(() => {
    if (!collectionOrders || !tokenId) return [];

    const candidates = new Set<string>();
    candidates.add(tokenId);

    try {
      if (tokenId.startsWith("0x")) {
        const numericId = BigInt(tokenId).toString();
        candidates.add(numericId);
      } else {
        candidates.add(`0x${BigInt(tokenId).toString(16)}`);
      }
    } catch (error) {
      candidates.add(BigInt(`0x${tokenId}`).toString());
    }

    for (const candidate of candidates) {
      const tokenOrders = collectionOrders[candidate];
      if (tokenOrders?.length) {
        return tokenOrders;
      }
    }

    return [];
  }, [collectionOrders, tokenId]);

  const pathBuilder = useControllerPathBuilder();
  const handleBuyCallback = useCallback(async () => {
    if (!isConnected) {
      if (isConnectDisabled) {
        return;
      }
      await onConnect();
    }

    const eventType = events.MARKETPLACE_PURCHASE_INITIATED;

    const orderIds = orders.map((order) => order.id).join(",");
    trackEvent(eventType, {
      purchase_type: "single",
      items_count: 1,
      order_ids: orderIds.split(","),
      collection_address: collectionAddress,
      buyer_address: address,
      item_token_ids: tokenId,
    });

    const controller = (connector as ControllerConnector)?.controller;
    const username = await controller?.username();
    if (!controller || !username) {
      console.error("Connector not initialized");
      trackEvent(events.MARKETPLACE_PURCHASE_FAILED, {
        error_message: "Connector not initialized",
        purchase_type: "single",
      });
      return;
    }

    const entrypoints = await getEntrypoints(
      provider.provider,
      collectionAddress,
    );
    const isERC1155 = entrypoints?.includes(ERC1155_ENTRYPOINT);
    const subpath = isERC1155 ? "collectible" : "collection";

    const project = DEFAULT_PROJECT;
    const preset = DEFAULT_PRESET;
    const options = [`ps=${project}`];
    if (preset) {
      options.push(`preset=${preset}`);
    } else {
      options.push("preset=cartridge");
    }

    options.push(`address=${getChecksumAddress(owner)}`);
    options.push(`tokenIds=${[addAddressPadding(tokenId)].join(",")}`);

  }, [
    address,
    connector,
    events,
    isConnected,
    isConnectDisabled,
    provider,
    tokenId,
    trackEvent,
    collectionAddress,
    orders,
    owner,
    pathBuilder,
  ]);

  return handleBuyCallback;
}

export function useHandleListCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "list",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

export function useHandleListViewCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "listView",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

export function useHandleUnlistCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "unlist",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

export function useHandleUnlistViewCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "unlistView",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

export function useHandleSendCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "send",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

export function useHandleSendViewCallback(): (
  collectionAddress: string,
  tokenIds: string[],
) => Promise<void> {
  const pathBuilder = useControllerPathBuilder();
  const openController = useOpenControllerAtPathCallback();
  return useCallback(
    async (collectionAddress: string, tokenIds: string[]) => {
      const path = pathBuilder({
        collectionAddress,
        tokenIds,
        viewType: "sendView",
      });
      return openController(path);
    },
    [pathBuilder, openController],
  );
}

type ControllerViewType =
  | "purchaseView"
  | "listView"
  | "unlistView"
  | "sendView"
  | "purchase"
  | "list"
  | "unlist"
  | "send";

type MakeControllerViewPathParams = {
  collectionAddress: string;
  tokenIds: string[];
  viewType: ControllerViewType;
  owner?: string;
};

function useControllerPathBuilder(): (
  params: MakeControllerViewPathParams,
) => string | undefined {
  const { address } = useAccount();
  const username = useUsernameByAddress(address);

  const collections = useTokenContracts();

  const callback = useCallback(
    ({
      collectionAddress,
      tokenIds,
      viewType,
      owner,
    }: MakeControllerViewPathParams) => {
      if (!username) return undefined;
      if (!collectionAddress) return undefined;
      if (tokenIds.length === 0) return undefined;

      const collection = collections.data?.find(
        (collection) => collection.contract_address === collectionAddress,
      );
      const isERC1155 = collection
        ? collection.contract_type === CollectionType.ERC1155
        : undefined;
      const subpath = isERC1155 ? "collectible" : "collection";

      const project = DEFAULT_PROJECT;
      const preset = DEFAULT_PRESET;
      const options = [`ps=${project}`];
      if (preset) {
        options.push(`preset=${preset}`);
      } else {
        options.push("preset=cartridge");
      }

      if (viewType.endsWith("View")) {
        options.push(`${viewType}=true`);

        if (viewType === "purchaseView") {
          if (!owner) return undefined;
          options.push(`address=${owner}`);
        }

        const tokenId = addAddressPadding(tokenIds[0]);

        return `account/${username}/inventory/${subpath}/${collectionAddress}/token/${tokenId}?${options.join("&")}`;
      }

      tokenIds.forEach((tokenId) => {
        options.push(`tokenIds=${addAddressPadding(tokenId)}`);
      });

      return `account/${username}/inventory/${subpath}/${collectionAddress}/${viewType}?${options.join("&")}`;
    },
    [username, collections],
  );

  return callback;
}

export function useOpenControllerAtPathCallback(): (
  path: string | undefined,
) => Promise<void> {
  const { connector } = useConnect();
  const { isConnected } = useAccount();
  const { onConnect, isConnectDisabled } = useConnectionViewModel();

  const callback = useCallback(
    async (path: string | undefined) => {
      if (!path) return;

      if (!isConnected) {
        if (isConnectDisabled) {
          return;
        }
        await onConnect();
      }

      const controller = (connector as ControllerConnector)?.controller;
      if (!controller) {
        console.error("Connector not initialized");
        return;
      }

      controller.openProfileAt(path);
    },
    [connector, isConnected, isConnectDisabled],
  );

  return callback;
}
