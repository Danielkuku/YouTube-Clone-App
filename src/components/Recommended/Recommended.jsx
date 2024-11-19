import "./Recommended.css";

import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [reconData, setReconData] = useState([]);
  const fetchData = async () => {
    // Use categoryId or a default value (e.g., "0" for general videos)
    const validCategoryId = categoryId ? categoryId : "0";

    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${validCategoryId}&key=${API_KEY}`;

    try {
      const response = await fetch(relatedVideo_url);
      const data = await response.json();

      // Log to check if data is received properly
      console.log("API Data:", data);

      if (data.items) {
        setReconData(data.items);
      } else {
        console.error("No items found in API response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {reconData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
