import { useParams } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import useGetStory from "@hooks/useGetStory";
import useWriteSentence from "@hooks/useWriteSentence";
import { StoryInput } from "@components";

const Story = ({ socket }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { story, loading, error } = useGetStory(id);
  const { storyText, textInput, setTextInput, validationMessage, count, sendMessage } = useWriteSentence(socket, id, user, story);

  const isCompleted = count < story.maxSentences;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="story-room">
        <h2>{story.title}</h2>
        <pre className="count">
          sentences {count}/{story.maxSentences}
        </pre>
        <div className="story-chat">
          {isCompleted ? (
            <div>
              <p>{storyText?.at(-1)}</p>
            </div>
          ) : (
            <p>{storyText}</p>
          )}
        </div>
      </div>
      {isCompleted && <StoryInput textInput={textInput} setTextInput={setTextInput} sendMessage={sendMessage} validationMessage={validationMessage} />}
    </div>
  );
};

export default Story;
