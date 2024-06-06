// create react component
import { useEffect, useMemo } from "react";
import UseCreateStory from "@hooks/useCreateStory";
import aa5 from "@assets/aa5.jpg";
import aa6 from "@assets/aa6.jpg";
import aa7 from "@assets/aa7.png";
import aa8 from "@assets/aa8.jpg";
import aa9 from "@assets/aa9.jpg";
import aa10 from "@assets/aa10.png";

const CreateStoryForm = ({ setShowCreateStoryForm }) => {
  const { storyParameters, validationMessages, handleChange, handleSubmit, isFormOpened } = UseCreateStory();

  useEffect(() => {
    setShowCreateStoryForm(isFormOpened);
  }, [isFormOpened]);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <img src={RandomImage()} alt="random" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" value={storyParameters.title} onChange={handleChange} />
      {validationMessages.title && <span style={{ color: "red", fontSize: "11px" }}>{validationMessages.title}</span>}

      <label htmlFor="topic">Topic (optional)</label>
      <input type="text" id="topic" name="topic" value={storyParameters.topic} onChange={handleChange} />

      <label htmlFor="maxSentences">Max Sentences</label>
      <input type="number" id="maxSentences" name="maxSentences" value={storyParameters.maxSentences} onChange={handleChange} />

      {validationMessages.maxSentences && <span style={{ color: "red", fontSize: "11px" }}>{validationMessages.maxSentences}</span>}
      <br />
      <button type="submit">Create Story</button>
    </form>
  );
};

const RandomImage = () => {
  const images = [aa5, aa6, aa7, aa8, aa9, aa10];
  const randomIndex = useMemo(() => Math.floor(Math.random() * images.length), []);
  return images[randomIndex];
};

export default CreateStoryForm;
