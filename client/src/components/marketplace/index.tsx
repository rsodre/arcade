import { Empty } from "@cartridge/ui";

export function Marketplace() {
  return <EmptyState />;
}

const EmptyState = () => {
  return (
    <Empty
      title="Coming soon"
      icon="inventory"
      className="h-full py-3 lg:py-6"
    />
  );
};
