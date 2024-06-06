import { Link } from "react-router-dom";

function StoryItem({ story, onDeleteStory }) {
  return (
    <li className="story-item">
      <div className="story-link">
        <Link to={`/stories/${story._id}`} style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{story.title}</h3>
          <p className={story.completed ? "completed" : "active"}>{story.completed ? "completed" : "active"}</p>
        </Link>
      </div>

      <button
        onClick={() => {
          onDeleteStory(story._id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default StoryItem;
