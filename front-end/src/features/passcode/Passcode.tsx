import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { PasscodeForm } from "./PasscodeForm";

const Passcode = () => {
  return (
    <Flex
      width={"full"}
      direction={"column"}
      align={"center"}
      position={"relative"}
    >
      <VStack
        flex={1}
        backgroundColor={"teal.200"}
        padding={"8"}
        margin={{ md: 4 }}
        marginBottom={{ md: 32 }}
        paddingX={{ md: 24 }}
        borderTopRadius={"2xl"}
        spacing={8}
        bgGradient={
          "linear-gradient(0deg, var(--chakra-colors-teal-300) 0%,var( --chakra-colors-teal-200) 40%)"
        }
      >
        <Heading fontSize={"3xl"}>
          Welcome to <i>Future Perfect!</i>
        </Heading>
        <Text fontSize={"xl"}>
          Our app is here to help you achieve your daily goals and become more
          organized in the process. With Future Perfect, you can set your goals
          for the day and then split them into manageable tasks. You can then
          set a timer to work on each task and take breaks in between. Our
          unique timer system oscillates between work and break times to keep
          you focused and refreshed, so you can stay on track to achieve your
          goals.
        </Text>
      </VStack>
      <Flex
        width={"full"}
        height={"full"}
        position={"absolute"}
        justify={"center"}
        alignItems="end"
      >
        <PasscodeForm bottom="0" shadow={"xl"} marginBottom={{ md: 20 }} />
      </Flex>
    </Flex>
  );
};

export { Passcode };
