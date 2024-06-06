const StoryInput = ({ textInput, setTextInput, sendMessage, validationMessage }) => {
  return (
    <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem" }} className="story-input">
      <label htmlFor="textInput">Add a sentence</label>
      <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />{" "}
      <span style={{ color: "red", fontSize: "11px" }}>{validationMessage}</span>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          sendMessage(textInput);
          setTextInput("");
        }}
      >
        Add
      </button>
    </form>
  );
};

export default StoryInput;
