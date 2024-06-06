import { useState } from "react";
import { StoryList } from "@components";
import { CreateStoryForm } from "@components";

import { Modal, PlayInstructions } from "@components";

const Home = ({ socket, stories, onJoinStory }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCreateStoryForm, setShowCreateStoryForm] = useState(false);

  return (
    <div className="main-container">
      <h1>One-Line Story Game</h1>
      <h4>Welcome to the One-Line Story Game! This is a fun and creative way to craft unique stories with others, one sentence at a time.</h4>

      {showInstructions && (
        <Modal onClose={() => setShowInstructions(false)}>
          <PlayInstructions />
        </Modal>
      )}

      <dir className="home-buttons">
        <button onClick={() => setShowInstructions(true)}>Show Instructions</button>
        <button onClick={() => setShowCreateStoryForm(true)}>Create New Story</button>
      </dir>

      {showCreateStoryForm && (
        <Modal onClose={() => setShowCreateStoryForm(false)}>
          <CreateStoryForm setShowCreateStoryForm={setShowCreateStoryForm} />
        </Modal>
      )}

      <StoryList stories={stories} onJoinStory={onJoinStory} socket={socket} />
    </div>
  );
};

export default Home;
