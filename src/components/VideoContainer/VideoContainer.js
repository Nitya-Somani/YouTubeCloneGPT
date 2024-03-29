import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchVideos } from "../../utils/customHooks/hooksIndex";
import { VideoCard, ShimmerVideoContainer } from "../componentsIndex";

const VideoContainer = () => {
  const theme = useSelector((store) => store.theme.isDarkTheme);
  const filterBtn = useSelector((store) => store.search.filterbtn);
  const filterbtnSearch = useSelector((store) => store.search.filterbtnSearch);
  const allVideos = useFetchVideos();
  const videos = filterBtn ? filterbtnSearch : allVideos;
  if (videos === null) return <ShimmerVideoContainer />;

  return (
    <div
      className={`${
        theme ? "bg-gray-900 text-white" : "bg-white text-black"
      } flex flex-wrap mt-[60px]`}
    >
      {videos?.map((video) => (
        filterBtn ?(
        <Link key={video.id} to={"/watch?v=" + video.id.videoId}>
          <VideoCard key={video.id} info={video} />
        </Link> ):(<Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard key={video.id} info={video} />
        </Link> )
      ))}
    </div>
  );
};

export default VideoContainer;
