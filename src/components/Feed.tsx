import { useState } from "preact/hooks";
import { Box, Stack, Typography, Alert } from "@mui/material";
import { Loader, Sidebar, Videos } from "./";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["channels", selectedCategory],
    queryFn: async () => {
      return await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`);
    },
  });

  if (isPending) return <Loader />;
  if (isError) {
    return (
      <Alert variant="filled" severity="error">
        {"An error has occurred: " + error.message}
      </Alert>
    );
  }
  const videos = data.items;

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © {new Date().getFullYear()}{" "}
          <a
            style={{ color: "white", textDecoration: "underline" }}
            href="https://thedevguy.in"
          >
            TheDevGuy
          </a>
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FF0000" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
