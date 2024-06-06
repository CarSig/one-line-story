import { useState } from "react";
import instructionSteps from "@data/instructions";

const PlayInstructions = () => {
  const [stepIndex, setStepIndex] = useState(0);
  return (
    <div>
      <h3 className="instructions-title">How to Play:</h3>
      <div className="step-container">
        <button onClick={() => setStepIndex((i) => Math.max(i - 1, 0))} disabled={stepIndex === 0}>
          Previous
        </button>
        <Step {...instructionSteps[stepIndex]} />
        <button onClick={() => setStepIndex((i) => Math.min(i + 1, instructionSteps.length - 1))} disabled={stepIndex === instructionSteps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};
export default PlayInstructions;

const Step = ({ title, description, image }) => {
  return (
    <div className="instructions-step">
      <img width={300} src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
