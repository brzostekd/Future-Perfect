import {
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ObjectId } from "bson";
import { Formik, Form, Field } from "formik";
import React, { PropsWithChildren } from "react";
import { STATUS, Goal } from "../../types/Index";
import { AddGoalDynamicFields } from "./AddGoalDynamicFields";
interface Props extends PropsWithChildren {
  initialValues: Goal;
  onSubmit: (values: Goal) => void;
}
const GoalForm = (props: Props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validateOnChange={false}
    >
      {(formikProps) => {
        return (
          <Form>
            <ModalBody>
              <VStack align={"stretch"}>
                <FormControl
                  isInvalid={
                    !!formikProps.errors.name && formikProps.touched.name
                  }
                >
                  <Field
                    as={Input}
                    isRequired={true}
                    name={"name"}
                    id={"name"}
                    placeholder={"What's your goal?"}
                    validate={(v: string) => {
                      if (v.length < 1)
                        return "Please, provide a name of the goal";
                    }}
                  />
                  <FormErrorMessage>{formikProps.errors.name}</FormErrorMessage>
                </FormControl>
                <AddGoalDynamicFields formikProps={formikProps} />
              </VStack>
            </ModalBody>
            {props.children ?? null}
          </Form>
        );
      }}
    </Formik>
  );
};

export { GoalForm };
