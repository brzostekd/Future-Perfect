import { FormikProps } from "formik";
import { Goal } from "../types/Index";

const handlePriorityAddition = (
  formikProps: FormikProps<Goal>,
  index: number,
  value: number
) => {
  return () => {
    formikProps.setValues((prevState) => {
      const state = { ...prevState };
      const calculated =
        // Do the type check in case that the formik field onchange
        // function will turn priority into a string
        typeof state.tasks[index].priority === "number"
          ? Number(state.tasks[index].priority) + value
          : state.tasks[index].priority + value;
      state.tasks[index].priority = calculated > 0 ? calculated : 1;
      return state;
    });
  };
};
const castPriorityToNumber = (
  formikProps: FormikProps<Goal>,
  index: number
) => {
  formikProps.setValues((prevState) => {
    const state = { ...prevState };
    state.tasks[index].priority = Number(state.tasks[index].priority);
    if (isNaN(state.tasks[index].priority)) {
      state.tasks[index].priority =
        state.tasks
          .map((el) => (isNaN(el.priority) ? 0 : el.priority))
          .sort()
          .splice(-1)[0] + 1;
    }
    return state;
  });
};
export { handlePriorityAddition, castPriorityToNumber };
