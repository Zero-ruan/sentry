import { createRoot } from "react-dom/client";
import App from "./App";
import { SentryContextProvider } from "./useSentry";
import "./assets/styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <SentryContextProvider>
    <App />
  </SentryContextProvider>
);

serviceWorker.unregister();
