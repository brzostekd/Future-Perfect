import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

const Intro = ({ onClick }: { onClick: () => void }) => {
  return (
    <Flex align={"center"} direction={"column"}>
      <VStack
        padding={"8"}
        margin={{ md: 4 }}
        flex={1}
        backgroundColor={"teal.200"}
        paddingTop={{ sm: 8, md: 24 }}
        paddingBottom={{ base: "4rem" }}
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
        <Text fontSize={{ base: "md", sm: "1.2rem", md: "xl" }}>
          Our app is here to help you achieve your daily goals and become more
          organized in the process. With Future Perfect, you can set your goals
          for the day and then split them into manageable tasks. You can then
          set a timer to work on each task and take breaks in between. Our
          unique timer system oscillates between work and break times to keep
          you focused and refreshed, so you can stay on track to achieve your
          goals.
        </Text>
      </VStack>
      <VStack
        padding={4}
        borderRadius={"xl"}
        position={{ base: "relative" }}
        bottom={"0"}
        transform={"translateY(-50%)"}
        backgroundColor={"white"}
        shadow={["2xl", "2xl", "xl"]}
      >
        <Button
          size={"lg"}
          colorScheme="teal"
          fontSize={"5xl"}
          paddingY={2}
          height={"auto"}
          onClick={onClick}
        >
          Let's begin!
        </Button>
      </VStack>
    </Flex>
  );
};

export { Intro };
