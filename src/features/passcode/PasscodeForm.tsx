import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

// IMPORTANT:
// This component is part of a feature that is not going to be implemented.
// I'm keeping this code for potential use in the future, in case of
// change in direction and further development.

const PasscodeForm = (props: StackProps) => {
  return (
    <Formik
      initialValues={{
        passcode: "",
      }}
      onSubmit={() => {
        alert("SUBMIT");
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <VStack
              padding={4}
              borderRadius={"xl"}
              align="end"
              backgroundColor={"white"}
              {...props}
            >
              <FormControl isInvalid={!!errors.passcode && touched.passcode}>
                <FormLabel htmlFor="passcode">Passcode:</FormLabel>
                <Field
                  name="passcode"
                  placeholder="Your board's passcode"
                  as={Input}
                  variant="filled"
                  validate={(value: string) =>
                    value !== "qq" ? "This error is bad" : undefined
                  }
                />
                <FormHelperText>
                  Anyone who knows the passcode
                  <br /> will be able to access your board
                </FormHelperText>
                <FormErrorMessage>{errors.passcode}</FormErrorMessage>
              </FormControl>
              <Button colorScheme={"teal"} type="submit">
                Submit
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export { PasscodeForm };
