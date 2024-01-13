import { ErrorBoundary } from "react-error-boundary";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { DarkModeProvider } from "./context/DarkmodeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ErrorBoundary
        fallback={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </DarkModeProvider>
  </React.StrictMode>
);
