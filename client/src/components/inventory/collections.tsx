import { Card, CardHeader, CardTitle } from "@cartridge/ui-next";
import { CollectionImage } from "./image";
import { useCollections } from "@/hooks/collection";

export const Collections = () => {
  const { collections, status } = useCollections();

  switch (status) {
    case "loading":
    case "error": {
      return null;
    }
    default: {
      return (
        <div className="grid grid-cols-2 gap-4 place-items-center select-none">
          {collections.map((collection) => (
            <div className="w-full aspect-square group select-none">
              <Card className="w-full h-full">
                <CardHeader className="flex flex-row gap-1 group-hover:opacity-70 items-center justify-between">
                  <CardTitle className="truncate">{collection.name}</CardTitle>
                  <div className="truncate rounded-full min-w-5 h-5 flex justify-center items-center text-xs font-bold bg-accent px-1.5">
                    {collection.totalCount}
                  </div>
                </CardHeader>

                <CollectionImage imageUrl={collection.imageUrl || undefined} />
              </Card>
            </div>
          ))}
        </div>
      );
    }
  }
};
