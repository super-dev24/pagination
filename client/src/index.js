import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Demo from "./demo";
import EditProduct from "./EditProduct";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "630e8e6b50a699e9c2903990af5645c7Tz00OTg4MCxFPTE2OTMzMTY0NjE5NDMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Demo />,
  },
  {
    path: "/products/:id",
    element: <EditProduct />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector("#root")).render(
  <QueryClientProvider client={queryClient}>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
