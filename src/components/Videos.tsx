import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";
import { Loader } from "./";
import { Video } from "@/types";

type VideosProps = {
  videos: Video[];
  direction?: "row" | "column";
};

const Videos = ({ videos, direction }: VideosProps) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
