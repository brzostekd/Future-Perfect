import {
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
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
    <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
      {(formikProps) => {
        return (
          <Form>
            <ModalBody>
              <VStack align={"stretch"}>
                <Field
                  as={Input}
                  name={"goalName"}
                  placeholder={"What's your goal?"}
                />
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
