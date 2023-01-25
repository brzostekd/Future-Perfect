import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

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
