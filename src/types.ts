export type Video = {
    id: {
      videoId: string;
      channelId: string;
    };
    statistics : {
      subscriberCount : string
      viewCount? : string
      likeCount? : string
    }
    snippet: {
      title : string
      channelId? : string
      channelTitle : string
      thumbnails: {
        high: {
          url?: string;
        };
      };
    };
  };