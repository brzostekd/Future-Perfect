import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ClockCircle } from "./ClockCircle";

const Clock = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      marginX={"6"}
      position={"relative"}
    >
      <ClockCircle fraction={0 / 6}></ClockCircle>
      <VStack position={"absolute"}>
        <Heading fontSize={"7xl"} marginTop={"4"}>
          15:22
        </Heading>
        <Box
          padding={"3"}
          backgroundColor={"blackAlpha.100"}
          borderRadius={"full"}
        >
          <Text as={"b"}>WORK</Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export { Clock };
