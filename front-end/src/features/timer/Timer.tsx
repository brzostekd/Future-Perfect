import {
  Box,
  FlexProps,
  StackProps,
  VStack,
  Text,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Clock } from "./Clock";

const Timer = (props: StackProps) => (
  <VStack
    {...props}
    alignItems={"stretch"}
    justifyContent={"space-between"}
    margin={"5"}
    spacing="3"
  >
    <Clock></Clock>
    <VStack>
      <Text fontSize={"md"} textAlign={"center"}>
        Current task:
      </Text>
      <Select
        defaultValue={4}
        variant={"filled"}
        colorScheme={"teal"}
        fontSize={"xl"}
        textAlign={"center"}
      >
        <option value={1}>1. Take a shower</option>
        <option value={2}>2. Dress up</option>
        <option value={3}>3. Go outside</option>
        <option value={4}>4. Win the minds of people</option>
      </Select>
      {/* <Text fontSize={"2xl"} textAlign={"center"} noOfLines={1}>
        Designing frontend front ass frontend UIesigning frontend UI
      </Text> */}
    </VStack>
    <Button colorScheme={"teal"}>MARK DONE</Button>
  </VStack>
);

export default Timer;
