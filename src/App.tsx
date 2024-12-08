import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "react-hot-toast";

// Create a client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    queryClient: QueryClient;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
      <Toaster
        toastOptions={{
          // Define default options
          className: "iqom-toast",
          duration: 3000,
          position: "bottom-center",
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export { App };
