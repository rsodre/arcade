import { InventoryItemsContainer } from "@/features/inventory/items";
import { useProject } from "@/hooks/project";

export const InventoryItemsScene = () => {
  const { collection } = useProject();
  if (!collection) return null;
  return <InventoryItemsContainer collectionAddress={collection} />;
};
