import  { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import image from "../assets/header.png"
import VideoThumbnail from '../Components/VideoThumbnailPage';

export interface Video {
  postId: string;
  creator: {
    name: string;
    id: string;
    handle: string;
    pic: string;
  };
  submission: {
    title: string;
    description: string;
    mediaUrl: string;
    thumbnail: string;
    hyperlink: string;
    placeholderUrl: string;
  };
  reaction: {
    count:Number
  }; // Add like count
  comment: {
    count:Number   
  }; // Add comments
}

function ThumbnailPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `https://internship-service.onrender.com/videos?page=${page-1}&limit=12`
        );

        if (Array.isArray(response.data.data.posts)) {
          setVideos(response.data.data.posts);
        } else {
          setError('API response does not contain video data' + response.data.data.posts);
        }
      } catch (error) {
        setError('Error fetching videos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleThumbnailClick = (video: Video) => {
    setSelectedVideo(video);
    // if (videoRef.current) {
    //     videoRef.current.scrollIntoView({ behavior: 'smooth' });
    //   }
    
    
    if (videoRef.current) {
        videoRef.current.addEventListener('loadedmetadata', () => {
          // Scroll to the video once it has loaded its metadata
          videoRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
        videoRef.current.load(); // Trigger loading the video metadata
      }

    console.log(video)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 w-80%">
        <img
         src={image}
         alt=""
         className="w-full h-100 mb-12"
        />
      {/* <h1 className="text-5xl font-bolder mb-7 underline ">Video Thumbnails</h1> */}
      {selectedVideo && (
        <div className="mb-4">
          <h2 className="text-3xl font-semibold mb-6 mt-6  ">{selectedVideo.submission.title}</h2>
          <video
           ref={videoRef}
            src={selectedVideo.submission.mediaUrl}
            controls
            className="w-80 m-auto  rounded-3xl"
          ></video>
           <div className="flex items-center mt-2  ">
            <img
              src={selectedVideo.creator.pic}
              alt={selectedVideo.creator.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <p className="text-sm text-white-600 ">{selectedVideo.creator.handle}</p>
            {/* <span className="text-sm text-gray-400 mx-2">|</span> */}
            
          </div>
          <p className="mt-4  ">{selectedVideo.submission.description}</p>

          {/* Display like count and comments */}
          <div className="mt-4 flex justify-center">
            {/* <p className="text-xl font-semibold">Like Count: {selectedVideo.reaction.count}</p>
            <p className="text-xl font-semibold ml-4">Comments:{selectedVideo.comment.count}</p> */}
           <div className="flex items-center">
              <span className="bg-blue-200 text-blue-600 text-xs font-semibold px-2 rounded-full mr-2">
              Likes: {selectedVideo.reaction.count.toString()}
              </span>
              <span className="bg-green-200 text-green-600 text-xs font-semibold px-2 rounded-full">
                Comments: {selectedVideo.comment.count.toString()}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.postId}
            onClick={() => handleThumbnailClick(video)}
            className="cursor-pointer"
          >
            <div className="bg-white rounded-xl shadow-md">
              <img
                src={video.submission.thumbnail}
                alt={video.submission.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-3xl font-semibold text-black  ">{video.submission.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {videos.map((video) => (
    // <div
    //   key={video.postId}
    //   onClick={() => handleThumbnailClick(video)}
    //   className="cursor-pointer"
    // >
    //   <div className="bg-white rounded-xl shadow-md">
    //     <img
    //       src={video.submission.thumbnail}
    //       alt={video.submission.title}
    //       className="w-full h-full object-cover rounded-t-lg"
    //     />
    //     <div className="p-4">
    //       <p className="text-3xl font-semibold text-black">{video.submission.title}</p>
          
    //       {/* Display the creator's profile picture, user handle, like count, and comment count */}
    //       <div className="flex items-center mt-2">
    //         <img
    //           src={video.creator.pic}
    //           alt={video.creator.name}
    //           className="w-8 h-8 rounded-full mr-2"
    //         />
    //         <p className="text-sm text-gray-600">{video.creator.handle}</p>
    //         {/* <span className="text-sm text-gray-400 mx-2">|</span> */}
            
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <VideoThumbnail key={video.postId} video={video} onClick={handleThumbnailClick} />
  ))}
</div>


      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`${
            page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold px-4 py-2 rounded`}
        >
          Previous
        </button>
        <span className="text-gray-600  m-20 ">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page === 9}
          className={`${
            page === 9 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }text-white font-semibold px-4 py-2 rounded1`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ThumbnailPage;







// {
// "postId":"7a57a613-a47b-46dd-8833-b5830c41ce51",
// "creator":{
//     "name":"Pamu",
//     "id":"45ec864b-641c-4cd8-a1c2-600947ae2cd0",
//     "handle":"thepramodsirvi",
//     "pic":"https://cdn.gro.care/fd3657a21d21_1683505781883.webp"
// },
// "comment":{
//     "count":0,
//     "commentingAllowed":true
// },
// "reaction":{
//     "count":5
//     ,"voted":false
// },
// "submission":{
//     "title":"Random Title",
//     "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet enim nec libero faucibus imperdiet. Nam auctor commodo nulla nec finibus. Etiam gravida mauris at neque scelerisque, eu euismod ex sodales. In at risus at ipsum blandit ultricies a a ipsum. Integer euismod consectetur dignissim. ",
//     "mediaUrl":"https://cdn.gro.care/844017b05de3_1683459484604.mp4",
//     "thumbnail":"https://cdn.gro.care/6d1cea1a3030_1683459483972.jpeg",
//     "hyperlink":"https://links.gro.care/gschPg7VwgL7hERo7",
//     "placeholderUrl":"https://cdn.gro.care/63ea757b223d_1661257638440.bin"
// }
// }
