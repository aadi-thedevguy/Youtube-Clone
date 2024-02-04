import { render } from "preact";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import { routeTree } from "./routes";
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({ routeTree });

const queryClient = new QueryClient();

render(
  <main>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </main>,
  document.getElementById("app") as HTMLDivElement
);
// render(<App />, document.getElementById("app") as HTMLDivElement);
