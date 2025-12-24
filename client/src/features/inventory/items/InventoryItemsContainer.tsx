import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ItemsEmptyState,
  ItemsLoadingState,
} from "@/components/ui/marketplace/ItemsView";

export const InventoryItemsContainer = ({
  collectionAddress,
}: {
  collectionAddress: string;
}) => {

  const isLoading = false;
  const shouldShowEmpty = true;

  if (isLoading) {
    return <ItemsLoadingState />;
  }

  if (shouldShowEmpty) {
    return <ItemsEmptyState />;
  }

  return (
    <></>
  );
};
