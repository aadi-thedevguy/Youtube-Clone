import { Box, Typography, Alert } from "@mui/material";
import { useParams } from "@tanstack/react-router";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useQuery } from "@tanstack/react-query";
const SearchFeed = () => {
  const {searchTerm} = useParams({from : "/search/$searchTerm"});

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["channels", searchTerm],
    queryFn: async () => {
      return await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
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
    <Box p={2} sx={{ overflowY: "auto", height: "95%", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: "#ffffff" }}
      >
        Search Results for :{" "}
        <span style={{ color: "#FF0000" }}>{searchTerm} </span>Videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
