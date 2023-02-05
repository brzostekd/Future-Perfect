import {
  HStack,
  FormControl,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ObjectId } from "bson";
import {
  FieldArray,
  Field,
  FormikProps,
  FieldArrayRenderProps,
  FormikErrors,
  FastField,
} from "formik";
import React from "react";
import { memo, useEffect, useMemo, useState } from "react";
import { Goal, STATUS, Task } from "../../types/Index";
import { castPriorityToNumber, handleAddPriority } from "../../utils";

const validateTaskNameField = (v: string) => {
  if (!v) return "Please, provide a name of the task";
};

const AddGoalDynamicFields = ({
  formikProps,
}: {
  formikProps: FormikProps<Goal>;
}) => {
  const [timeoutId, setTimeoutId] = useState<undefined | NodeJS.Timeout>();
  const handleNumberInputFieldChange = (index: number) => (e: any) => {
    formikProps.handleChange(e);
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        castPriorityToNumber(formikProps, index);
      }, 60)
    );
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <FieldArray name="tasks">
      {(arrayHelpers) => (
        <>
          <VStack maxHeight={"md"} overflowY={"auto"} alignItems={"stretch"}>
            {formikProps.values.tasks.map((task, index) => (
              <FieldArray key={`${task.id}`} name={`tasks.${index}`}>
                {() => (
                  <HStack align={"start"}>
                    {["priority", "name"].map((field) => (
                      <FormControl
                        isRequired={true}
                        key={`${task.id}${field}`}
                        width={field === "priority" ? "5rem" : "max"}
                        flex={field === "priority" ? "unset" : "1"}
                        isInvalid={
                          formikProps.errors.tasks &&
                          formikProps.errors.tasks[index] &&
                          (formikProps.errors as any).tasks[index][field] &&
                          formikProps.touched.tasks &&
                          formikProps.touched.tasks[index] &&
                          (formikProps.touched as any).tasks[index][field]
                        }
                      >
                        {field === "priority" ? (
                          <FastField
                            as={NumberInput}
                            name={`tasks.${index}.${field}`}
                            min={1}
                            type="number"
                            validate={(v: number) => {
                              if (v < 1)
                                return "The priority number has to be more or qual to 1";
                            }}
                          >
                            <NumberInputField
                              min={1}
                              value={task.priority}
                              // type={"number"}
                              onChange={handleNumberInputFieldChange(index)}
                            />
                            <NumberInputStepper>
                              <NumberIncrementStepper
                                onClick={handleAddPriority(
                                  formikProps,
                                  index,
                                  1
                                )}
                              />
                              <NumberDecrementStepper
                                onClick={handleAddPriority(
                                  formikProps,
                                  index,
                                  -1
                                )}
                              />
                            </NumberInputStepper>
                          </FastField>
                        ) : (
                          <FastField
                            as={Input}
                            name={`tasks.${index}.${field}`}
                            placeholder={"Task"}
                            validate={validateTaskNameField}
                          ></FastField>
                        )}
                        <FormErrorMessage>
                          {formikProps.errors.tasks &&
                            formikProps.errors.tasks[index] &&
                            (formikProps.errors.tasks[index] as any)[field]}
                        </FormErrorMessage>
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
                  // created_at: new Date(),
                  status: STATUS.Pending,
                  priority:
                    formikProps.values.tasks.length > 0
                      ? formikProps.values.tasks[
                          formikProps.values.tasks.length - 1
                        ].priority + 1
                      : 1,
                })
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
