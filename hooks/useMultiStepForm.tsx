"use client";

import { ReactElement, useEffect } from "react";

import { useRouterQuery } from "../hooks/useRouterQuery";

export const useMultiStepForm = (steps: ReactElement[], formType?: string) => {
  const { push, changeQuery, getQuery } = useRouterQuery();

  const step = getQuery("step");

  const stepIndex = +step;

  useEffect(() => {
    if (!step) {
      changeQuery("step", "1");
    }
  }, [step]);
  const next = () => {
    if (stepIndex < steps.length) {
      const nextPage = stepIndex + 1;
      console.log(nextPage);

      changeQuery("step", nextPage.toString());
    }
  };

  const back = () => {
    const prevPage = stepIndex - 1;

    if (prevPage >= 1) {
      changeQuery("step", prevPage.toString());
    }
  };

  return {
    stepIndex,
    formStep:
      formType == "kdm"
        ? stepIndex == 2
          ? steps?.at(0)
          : steps?.at(stepIndex - 1)
        : steps?.at(stepIndex - 1),
    urlStep: step,
    steps,
    push,

    isFirstStep: stepIndex - 1 === 0,
    changeQuery,
    isLastStep: stepIndex - 1 === steps.length - 1,
    next,
    back,
  };
};
