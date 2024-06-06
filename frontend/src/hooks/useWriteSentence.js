import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@config";
import { useNavigate } from "react-router-dom";

const useWriteSentence = (socket, storyId, user, story) => {
  const [storyText, setStoryText] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [count, setCount] = useState(story.count);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("join-room", { user: user, story: story.title }, (msg) => {
        console.log("callback   ", msg);
      });
    });

    socket.on("receive-message", (msg) => {
      console.log("New message received:", msg);
      setStoryText((prevStoryText) => [...prevStoryText, msg]);
      setCount((prevCount) => prevCount + 1);
    });

    socket.on("roomDeleted", (data) => {
      console.log("Room deleted", data);
      const userConfirmed = window.confirm("This chat room has been deleted. You will be redirected to the home page.");
      if (userConfirmed) {
        navigate("/");
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
    });

    return () => {
      socket.off("roomDeleted");
    };
  }, [socket, story.title, user]);

  useEffect(() => {
    setStoryText(story.sentences);
    setCount(story.count);
  }, [story]);

  const updateStory = async (sentence) => {
    try {
      const sentenceArray = [...storyText, sentence];
      const isCompleted = sentenceArray.length >= story.maxSentences;
      const payload = { sentenceArray, count: sentenceArray.length, completed: isCompleted };
      const res = await axios.put(`${baseUrl}/stories/${storyId}`, payload);

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validate = (text) => {
    if (text.length < 5) {
      setValidationMessage("Sentence must be at least 5 characters long");
      return false;
    }
    setValidationMessage("");
    return true;
  };

  const sendMessage = (sentence) => {
    if (validate(sentence)) {
      const newSentence = sentence + " ";
      setStoryText([...storyText, newSentence]);
      socket.emit("send_message", sentence, story.title, user);
      updateStory(newSentence);
      setCount((prevCount) => prevCount + 1);
    }
  };

  return {
    storyText,
    textInput,
    setTextInput,
    validationMessage,
    count,
    sendMessage,
  };
};

export default useWriteSentence;
