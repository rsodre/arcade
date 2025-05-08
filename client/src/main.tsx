import { createRoot } from "react-dom/client";
import { SonnerToaster } from "@cartridge/ui-next";
import { App } from "@/components/app";
import { Provider } from "@/context";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

registerSW();

createRoot(document.getElementById("root")!).render(
  <>
    <Provider>
      <App />
    </Provider>
    <SonnerToaster position="top-center" />
  </>,
);
