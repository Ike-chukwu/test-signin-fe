import React from "react";

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
  goToStep: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStepIndex,
  goToStep,
}) => {
  return (
    <div className="flex justify-center space-x-4 p-4 border-b">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => goToStep(index)}
          disabled={index > currentStepIndex} // Optional: Prevent skipping steps
          className={`cursor-pointer px-4 py-2 rounded transition ${
            index === currentStepIndex
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {step.title}
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
