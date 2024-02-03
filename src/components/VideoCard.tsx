
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Avatar,Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Video } from "@/types";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

type VideoCardProps = {
  video : Video
}

const VideoCard = ({ video: { id: { videoId }, snippet } } : VideoCardProps) => {

return (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
      <Stack direction="row" spacing={2}>
          <Avatar alt="Channel Icon" sx={{ bgcolor: '#FF0000',width: 30, height: 30}} >YT</Avatar>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 44) || demoVideoTitle.slice(0, 44)}...
          </Typography>

      </Stack>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
)
}

export default VideoCard