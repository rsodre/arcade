import { MarketplaceItemsContainer } from "@/features/marketplace/items";
import { useProject } from "@/hooks/project";

export const InventoryItemsScene = () => {
  const { collection } = useProject();

  if (!collection) return null;
  return <MarketplaceItemsContainer collectionAddress={collection} />;
};
