import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { PasscodeContext } from "../../contexts";
import { PasscodeForm } from "./PasscodeForm";

// IMPORTANT:
// This component is part of a feature that is not going to be implemented.
// I'm keeping this code for potential use in the future, in case of
// change in direction and further development.

const Passcode = () => {
  const passcodeContext = useContext(PasscodeContext);
  if (!passcodeContext) throw Error("passcodeContext is undefined.");
  const [passcode, setPasscode] = passcodeContext;

  return (
    <Flex align={"center"} direction={"column"}>
      <VStack
        padding={"8"}
        margin={{ md: 4 }}
        marginBottom={{ base: 32, md: 32 }}
        flex={1}
        backgroundColor={"teal.200"}
        paddingX={{ sm: 8, md: 24 }}
        borderTopRadius={{ md: "2xl" }}
        spacing={8}
        bgGradient={
          "linear-gradient(0deg, var(--chakra-colors-teal-300) 0%,var( --chakra-colors-teal-200) 40%)"
        }
      >
        <Heading
          whiteSpace={"nowrap"}
          fontSize={"4xl"}
          wordBreak={"keep-all"}
          color={"teal.900"}
          textAlign={"center"}
        >
          Welcome to <wbr />
          <i>Future Perfect!</i>
        </Heading>
        <Text fontSize={{ base: "1rem", sm: "xl" }}>
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
        top={{ md: "10rem" }}
        bottom={{ base: "2rem", md: "unset" }}
        height={{ md: "full" }}
        position={"absolute"}
        justify={"center"}
        alignItems={"center"}
      >
        <PasscodeForm shadow={"xl"} />
      </Flex>
    </Flex>
  );
};

export {};
