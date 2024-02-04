import { Outlet, createRoute, createRootRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "@/components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Box sx={{ backgroundColor: "#181818" }}>
        <Navbar />
        <Outlet />
      </Box>
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Feed />,
});
const channelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/channel/$channelId",
  component: () => <ChannelDetail />,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search/$searchTerm",
  component: () => <SearchFeed />,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video/$id",
  component: () => <VideoDetail />,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  channelRoute,
  searchRoute,
  videoRoute,
]);
