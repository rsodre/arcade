import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArcadeProvider } from "./arcade";
import { ThemeProvider } from "./theme";
import { ConnectionProvider } from "./connection";
import { BrowserRouter } from "react-router-dom";
import { CartridgeAPIProvider } from "@cartridge/utils/api/cartridge";
import { IndexerAPIProvider } from "@cartridge/utils/api/indexer";
import { AchievementProvider } from "./achievement";
import { StarknetProvider } from "./starknet";
import { ProjectProvider } from "./project";
import { CollectionProvider } from "./collection";
import { TokenProvider } from "./token";

export function Provider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <CartridgeAPIProvider
        url={`${import.meta.env.VITE_CARTRIDGE_API_URL}/query`}
      >
        <IndexerAPIProvider credentials="omit">
          <QueryClientProvider client={queryClient}>
            <ArcadeProvider>
              <StarknetProvider>
                <ConnectionProvider>
                  <ThemeProvider defaultScheme="system">
                    <ProjectProvider>
                      <CollectionProvider>
                        <TokenProvider>
                          <AchievementProvider>{children}</AchievementProvider>
                        </TokenProvider>
                      </CollectionProvider>
                    </ProjectProvider>
                  </ThemeProvider>
                </ConnectionProvider>
              </StarknetProvider>
            </ArcadeProvider>
          </QueryClientProvider>
        </IndexerAPIProvider>
      </CartridgeAPIProvider>
    </BrowserRouter>
  );
}
