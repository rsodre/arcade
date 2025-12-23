import { createFileRoute } from "@tanstack/react-router";
import { InventoryItemsScene } from "@/components/scenes/inventory-items";

export const Route = createFileRoute("/inventory/collection/$collection")({
  validateSearch: (search: Record<string, unknown>) => ({
    filter: search.filter as string | undefined,
  }),
  component: InventoryItemsScene,
});
