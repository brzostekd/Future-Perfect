import {
  HStack,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";
import { ObjectId } from "bson";
import { FieldArray, Field, FormikProps } from "formik";
import { Goal, STATUS, Task } from "../../types/Index";
import { handleAddPriority } from "../../utils";

const AddGoalDynamicFields = ({
  formikProps,
}: {
  formikProps: FormikProps<Goal>;
}) => {
  return (
    <FieldArray name="tasks">
      {(arrayHelpers) => (
        <>
          <VStack maxHeight={"md"} overflowY={"scroll"} alignItems={"stretch"}>
            {formikProps.values.tasks.map((value1, index1) => (
              <FieldArray key={value1.id.toString()} name={`tasks.${index1}`}>
                {() => (
                  <HStack>
                    {Object.entries(formikProps.values.tasks[index1])
                      .filter((value) =>
                        ["name", "priority"].includes(value[0])
                      )
                      .reverse()
                      .map((values) => (
                        <FormControl
                          key={value1.id.toString() + values[0]}
                          width={values[0] === "priority" ? "5rem" : "max"}
                          flex={values[0] === "priority" ? "unset" : "1"}
                        >
                          {values[0] === "priority" ? (
                            <Field
                              as={NumberInput}
                              name={`tasks[${index1}].${values[0]}`}
                              min={1}
                            >
                              <NumberInputField
                                min={1}
                                value={
                                  formikProps.values.tasks[index1].priority
                                }
                                onChange={formikProps.handleChange}
                                type="number"
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper
                                  onClick={handleAddPriority(
                                    formikProps,
                                    index1,
                                    1
                                  )}
                                />
                                <NumberDecrementStepper
                                  onClick={handleAddPriority(
                                    formikProps,
                                    index1,
                                    -1
                                  )}
                                />
                              </NumberInputStepper>
                            </Field>
                          ) : (
                            <Field
                              as={Input}
                              name={`tasks[${index1}].${values[0]}`}
                              placeholder={"Task"}
                            ></Field>
                          )}
                        </FormControl>
                      ))}
                  </HStack>
                )}
              </FieldArray>
            ))}
          </VStack>
          <HStack>
            <Button
              onClick={() =>
                arrayHelpers.push({
                  id: new ObjectId(),
                  name: "",
                  created_at: new Date(),
                  status: STATUS.Pending,
                  priority:
                    formikProps.values.tasks[
                      formikProps.values.tasks.length - 1
                    ].priority + 1,
                } as Task)
              }
              flex={"1"}
            >
              Add
            </Button>
            {formikProps.values.tasks.length > 1 ? (
              <Button onClick={() => arrayHelpers.pop()} flex={"1"}>
                Remove
              </Button>
            ) : null}
          </HStack>
        </>
      )}
    </FieldArray>
  );
};

export { AddGoalDynamicFields };
