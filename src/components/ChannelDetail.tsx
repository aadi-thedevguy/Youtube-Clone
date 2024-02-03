import { useParams } from "react-router-dom";
import { Box, Alert } from "@mui/material";

import { Videos, ChannelCard, Loader } from "./";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

const ChannelDetail = () => {
  const { id } = useParams();

  const { data: videoData } = useQuery({
    queryKey: ["videos", id],
    queryFn: async () =>
      await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`),
  });
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["channels", id],
    queryFn: async () => {
      return await fetchFromAPI(`channels?part=snippet&id=${id}`)
    } 
  });

  if (isPending) return <Loader />;
  if (isError) {
    return (
      <Alert variant="filled" severity="error">
        {"An error has occurred: " + error.message}
      </Alert>
    );
  }
  const channelDetail = data && data.items && data.items[0];
  const videos = videoData && videoData.items;

  return (
    <Box minHeight="95vh">
      <div
        style={{
          height: "300px",
          background:
            "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
          zIndex: 10,
        }}
      />

      {channelDetail && (
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      )}
      <Box p={2} display="flex">
        {videos && <Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
