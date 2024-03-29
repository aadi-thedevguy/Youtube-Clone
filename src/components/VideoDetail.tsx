import { Link, useParams } from "@tanstack/react-router";
import ReactPlayer from "react-player/youtube";
import { Typography, Box, Stack, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useQuery } from "@tanstack/react-query";
import { Video } from "@/types";

const VideoDetail = () => {
  const { id } = useParams({ from: "/video/$id" });

  const { data: videoData } = useQuery({
    queryKey: ["videos", id],
    queryFn: async () =>
      await fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      ),
  });
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: async () => {
      return await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
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
  const videoDetail: Video = data && data.items && data.items[0];
  const videos : Video[] = videoData && videoData.items;

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              pip
              stopOnUnmount={false}
              volume={0.5}
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link
                to="/channel/$channelId"
                params={{ channelId: channelId ?? "" }}
              >
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {viewCount && parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {likeCount && parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {videos && <Videos videos={videos} direction="column" />}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
