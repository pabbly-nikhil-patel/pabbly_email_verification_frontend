import Box from '@mui/material/Box';
import VideoPlayListCards from 'src/components/video-play-list-card/video-playlist-card';



// ----------------------------------------------------------------------

export function VideoPlayList({ title, list, ...other }) {
  return (
    <Box
      sx={{
        mt: 3,
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
      }}
    >
      <VideoPlayListCards
        Videotitle="1. Introduction to Pabbly Connect"
        thumbnailimage="Introduction to Pabbly Connect.png"
        videoId="https://www.youtube.com/embed/CoIfgN0tfhE"
        videoTime="01 Min 12 Sec"
      />

      <VideoPlayListCards
        Videotitle="2. What is Triggers & Action?"
        thumbnailimage="1. What is Triggers  Action.png"
        videoId="https://www.youtube.com/embed/z2B7tBxN-ak"
        videoTime="15 Min 01 Sec"
      />
      <VideoPlayListCards
        Videotitle="3. How to use Webhooks"
        thumbnailimage="2. How to use Webhooks.png"
        videoId="https://www.youtube.com/embed/xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="4. How to use Email Parser"
        thumbnailimage="3. How to use Email Parser.png"
        videoId="https://www.youtube.com/embed/xxWoEJbrtFE"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="5. How to use Filters"
        thumbnailimage="4. How to use Filters.png"
        videoId="https://www.youtube.com/embed/W3HMbI5Q68U"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="6. How to use Routers"
        thumbnailimage="5. How to use Routers.png"
        videoId="https://www.youtube.com/embed/6XDASZVv3tw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="7. How to use Iterator"
        thumbnailimage="6. How to use Iterator.png"
        videoId="https://www.youtube.com/embed/zJaGQ-SIB0I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="8. How to use API Module"
        thumbnailimage="7. How to use API Module.png"
        videoId="https://www.youtube.com/embed/M-oU-yG-CCU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="9. Google Sheets Triggers"
        thumbnailimage="8. Google Sheets Triggers.png"
        videoId="https://www.youtube.com/embed/2YDqYkJhT_I"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="10. Working with Facebook Lead Ads"
        thumbnailimage="9. Working with Facebook Lead Ads.png"
        videoId="https://www.youtube.com/embed/afsGkIaLDlU"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="11. How to use Number Formatter"
        thumbnailimage="10. How to use Number Formatter.png"
        videoId="https://www.youtube.com/embed/cfrB2ahirlw"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="12. How to use Text Formatter"
        thumbnailimage="11. How to use Text Formatter.png"
        videoId="https://www.youtube.com/embed/Wp-4sQqNx9g"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="13. Existing Apps Authentication"
        thumbnailimage="12. Existing Apps Authentication.png"
        videoId="https://www.youtube.com/embed/L_IPt-R0ntA"
        videoTime="07 Min 23 Sec"
      />
      <VideoPlayListCards
        Videotitle="14. What is Pabbly Connect's Agency Feature?"
        thumbnailimage="14. What is Pabbly Connect's Agency Feature_.png"
        videoId="https://www.youtube.com/embed/W_mw1bd9KO4"
        videoTime="07 Min 23 Sec"
      />
    </Box>
  );
}
