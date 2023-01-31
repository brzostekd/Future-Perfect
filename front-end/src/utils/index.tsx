import { FormikProps } from "formik";
import { Goal } from "../types/Index";

const handleAddPriority = (
  formikProps: FormikProps<Goal>,
  index: number,
  value: number
) => {
  return () => {
    formikProps.setValues((prevState) => {
      console.log(formikProps, index, value);

      const state = structuredClone(prevState) as Goal;
      const calculated = state.tasks[index].priority + value;
      state.tasks[index].priority = calculated > 0 ? calculated : 1;
      return state;
    });
  };
};
export { handleAddPriority };
