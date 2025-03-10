import React, { useState } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import StepIndicator from "./StepIndicator";
import { formConfigTest } from "../utils";

// Define field types for dynamic form
interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "date"
    | "tel"
    | "textarea"
    | "select"
    | "radio"
    | "multi-select";
  required?: boolean;
  validation?: { message: string };
  options?: string[];
  condition?: (watchValues: FieldValues) => boolean;
  helpText?: string;
}

// Define a step in the multi-step form
interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
}

// Props for `DynamicFormStep`
interface DynamicFormStepProps {
  step: FormStep;
  defaultValues: Record<string, FieldValues>;
  onNext: (data: Record<string, FieldValues>) => void;
  onBack?: () => void;
}

// Dynamic form component
const DynamicFormStep: React.FC<DynamicFormStepProps> = ({
  step,
  defaultValues,
  onNext,
  onBack,
}) => {
  const { register, handleSubmit, watch, control } = useForm<FieldValues>({
    defaultValues: defaultValues[step.id] || {},
  });

  // Filter fields based on conditions
  const fieldsToRender = step.fields.filter((field) =>
    typeof field.condition === "function" ? field.condition(watch()) : true
  );

  // Handle form submission
  const onSubmit = (data: FieldValues) => {
    onNext({ [step.id]: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 h-full">
      <h3 className="text-lg font-bold mb-4">{step.title}</h3>
      {fieldsToRender.map((field) => {
        switch (field.type) {
          case "text":
          case "email":
          case "number":
          case "date":
          case "tel":
            return (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 font-semibold">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  {...register(field.name, {
                    required: field.required && field.validation?.message,
                  })}
                  className="border p-2 rounded w-full"
                />
              </div>
            );
          case "textarea":
            return (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 font-semibold">
                  {field.label}:
                </label>
                <textarea
                  {...register(field.name, {
                    required: field.required && field.validation?.message,
                  })}
                  className="border p-2 rounded w-full"
                  rows={4}
                />
              </div>
            );
          case "select":
            return (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 font-semibold">
                  {field.label}:
                </label>
                <select
                  {...register(field.name, {
                    required: field.required && field.validation?.message,
                  })}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          case "radio":
            return (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 font-semibold">
                  {field.label}:
                </label>
                {field.options?.map((option) => (
                  <label key={option} className="mr-4">
                    <input
                      type="radio"
                      value={option}
                      {...register(field.name, {
                        required: field.required && field.validation?.message,
                      })}
                      className="mr-1"
                    />
                    {option}
                  </label>
                ))}
              </div>
            );
          case "multi-select":
            return (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 font-semibold">
                  {field.label}:
                </label>
                <select
                  multiple
                  {...register(field.name, {
                    required: field.required && field.validation?.message,
                  })}
                  className="border p-2 rounded w-full"
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {field.helpText && (
                  <small className="text-gray-500">{field.helpText}</small>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
      <div className="mt-4 flex justify-between">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

// Props for `MultiStepForm`
interface MultiStepFormProps {
  steps: FormStep[];
}

// Multi-step form component
const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, FieldValues>>({});
  const steps: FormStep[] = formConfigTest as FormStep[];

  // Handle next step
  const handleNext = (data: Record<string, FieldValues>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission logic
      const finalData = { ...formData, ...data };
      console.log("Final submitted data:", finalData);
    }
  };

  // Handle going back
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 border rounded shadow-lg">
      <StepIndicator
        steps={steps}
        currentStepIndex={currentStep}
        goToStep={setCurrentStep}
      />
      <div className="h-[90%]">
        <DynamicFormStep
          step={steps[currentStep]}
          defaultValues={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default MultiStepForm;
