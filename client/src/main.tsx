import { createRoot } from "react-dom/client";
import { SonnerToaster } from "@cartridge/ui-next";
import { App } from "@/components/app";
import { Provider } from "@/context";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider>
      <App />
    </Provider>
    <SonnerToaster position="top-center" />
  </>,
);
