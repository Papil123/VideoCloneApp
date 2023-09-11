import React, { useRef } from 'react';
import { Video } from '../Pages/ThumbnailPage';

interface VideoThumbnailProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, onClick }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleThumbnailClick = () => {
    onClick(video);

    // Scroll to the videoRef element
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div onClick={handleThumbnailClick} className="cursor-pointer">
      <div className="bg-white rounded-xl shadow-md">
        <img
          src={video.submission.thumbnail}
          alt={video.submission.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="p-4">
          {/* <p className="text-3xl font-semibold">{video.submission.title}</p> */}


          <p className="text-3xl font-semibold text-black">{video.submission.title}</p>
          
          //       {/* Display the creator's profile picture, user handle, like count, and comment count */}
               <div className="flex items-center mt-2">
                   <img
                     src={video.creator.pic}
                     alt={video.creator.name}
                     className="w-8 h-8 rounded-full mr-2"
                   />
                   <p className="text-sm text-gray-600">{video.creator.handle}</p>
                   {/* <span className="text-sm text-gray-400 mx-2">|</span> */}
                  
                </div>


        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
