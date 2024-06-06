import { useState, useEffect } from "react";
import StoryItem from "./StoryItem";

import axios from "axios";
import { baseUrl } from "@/config";

const StoryList = ({ socket }) => {
  const [filter, setFilter] = useState("all");
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/stories`).then((res) => {
      setStories(res.data);
    });
  }, [stories]);

  const onJoinStory = (storyId) => {
    socket.emit("join-room", storyId);
  };

  const filteredStories = stories?.filter((story) => {
    if (filter === "active") {
      return !story.completed;
    } else if (filter === "completed") {
      return story.completed;
    }
    return true;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onDeleteStory = (storyId) => {
    axios.delete(`${baseUrl}/stories/${storyId}`).then((res) => {
      setStories(stories.filter((story) => story._id !== story._id));
      console.log("Story deleted", res.data);
      console.log(stories);
    });
    socket.emit("deleteRoom", storyId);
  };

  return (
    <div className="story-list">
      <h2>Stories</h2>

      <Filters filter={filter} handleFilterChange={handleFilterChange} />
      <ul className="story-item-container">
        {filteredStories?.map((story) => (
          <StoryItem
            key={story._id}
            onJoinStory={onJoinStory}
            story={story}
            onDeleteStory={() => {
              onDeleteStory(story._id);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

function Filters({ filter, handleFilterChange }) {
  return (
    <div className="filters">
      {" "}
      <div>
        <input type="radio" id="all" name="filter" value="all" checked={filter === "all"} onChange={handleFilterChange} />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input type="radio" id="active" name="filter" value="active" checked={filter === "active"} onChange={handleFilterChange} />
        <label htmlFor="active">Active</label>
      </div>
      <div>
        <input type="radio" id="completed" name="filter" value="completed" checked={filter === "completed"} onChange={handleFilterChange} />
        <label htmlFor="completed">Completed</label>
      </div>
    </div>
  );
}

export default StoryList;
