import { useState } from "react";
import axios from "axios";
import { useAuth } from "@context/AuthContext";
import { baseUrl } from "@config";

const CreateStoryForm = () => {
  const { user } = useAuth();
  const [storyParameters, setStoryParameters] = useState({ title: "", topic: "", maxSentences: "", author: user.username });
  const [validationMessages, setValidationMessages] = useState({ title: "", topic: "", maxSentences: "" });
  const [isFormOpened, setIsFormOpened] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryParameters({ ...storyParameters, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    const hasErrorMessages = Object.values(validationMessages).some((message) => message !== "" && message !== null);
    if (!hasErrorMessages) {
      try {
        await axios.post(`${baseUrl}/stories`, storyParameters);
        setIsFormOpened(false);

        setStoryParameters({ title: "", topic: "", maxSentences: "", author: user.username });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validate = () => {
    const messages = { title: "", topic: "", maxSentences: "" };
    if (!storyParameters.title) {
      messages.title = "Title is required";
    } else if (storyParameters.title.length < 5 || storyParameters.title.length > 30) {
      messages.title = "Title must be between 5 and 30 characters";
    }

    if (!storyParameters.maxSentences) {
      messages.maxSentences = "Max Sentences is required";
    } else if (storyParameters.maxSentences < 3 || storyParameters.maxSentences > 30) {
      messages.maxSentences = "Max Sentences must be between 3 and 30";
    }

    setValidationMessages(messages);
  };

  return { storyParameters, validationMessages, handleChange, handleSubmit, isFormOpened };
};

export default CreateStoryForm;
