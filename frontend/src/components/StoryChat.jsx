// // src/App.jsx
import { useState } from "react";

const StoryChat = ({ story, onAddSentence, onCompleteStory }) => {
  const [sentence, setSentence] = useState("");

  const handleAddSentence = (e) => {
    e.preventDefault();
    onAddSentence(story.id, sentence);
    setSentence("");
  };

  return (
    <div>
      <h2>{story.title}</h2>
      <p>{story.sentences.join(" ")}</p>
      <form onSubmit={handleAddSentence}>
        <input type="text" value={sentence} onChange={(e) => setSentence(e.target.value)} />
        <button type="submit">Add Sentence</button>
      </form>
      <button onClick={() => onCompleteStory(story.id)}>Complete Story</button>
    </div>
  );
};

export default StoryChat;
