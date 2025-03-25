import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useCollectionsQuery } from "@cartridge/utils/api/cartridge";

const LIMIT = 1000;

export type Collection = {
  address: string;
  name: string;
  type: string;
  imageUrl: string;
  totalCount: number;
};

export type Asset = {
  tokenId: string;
  name: string;
  description?: string;
  imageUrl: string;
  attributes: Record<string, unknown>[];
};

export type UseCollectionsResponse = {
  collections: Collection[];
  status: "success" | "error" | "idle" | "loading";
};

export type CollectionType = {
  contractAddress: string;
  imagePath: string;
  metadataAttributes: string;
  metadataDescription: string;
  metadataName: string;
  name: string;
  tokenId: string;
  count: number;
};

export function useCollections({
  projects,
}: {
  projects: string[];
}): UseCollectionsResponse {
  const { address } = useAccount();
  const [offset, setOffset] = useState(0);
  const [collections, setCollections] = useState<Collection[]>(
    [],
  );

  const { status } = useCollectionsQuery(
    {
      accountAddress: address ?? "",
      projects: projects,
    },
    {
      queryKey: ["collections", projects, offset],
      enabled: projects.length > 0 && !!address,
      onSuccess: ({ collections }) => {
        const newCollections: { [key: string]: Collection } = {};
        collections?.edges.forEach((e) => {
          const contractAddress = e.node.meta.contractAddress;
          const imagePath = e.node.meta.imagePath;
          const name = e.node.meta.name;
          const count = e.node.meta.assetCount;
          newCollections[`${contractAddress}`] = {
            address: contractAddress,
            imageUrl: imagePath,
            name,
            totalCount: count,
            type: "ERC-721",
          };
        });
        if (collections?.edges.length === LIMIT) {
          setOffset(offset + LIMIT);
        }
        setCollections(Object.values(newCollections).sort((a, b) => a.name.localeCompare(b.name)));
      },
    },
  );

  return { collections, status };
}
