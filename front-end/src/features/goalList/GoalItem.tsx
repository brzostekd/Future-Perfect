import {
  Flex,
  VStack,
  Text,
  Box,
  HStack,
  FlexProps,
  Colors,
} from "@chakra-ui/react";
type COLORS =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "purple"
  | "cyan"
  | "pink";
const GoalItem = ({
  selected = false,
  color = "teal",
}: {
  selected?: boolean;
  color?: COLORS;
}) => {
  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      bgColor={`${color}.200`}
      borderRadius={"1.2rem"}
      border={selected ? "4px" : 0}
      borderColor={selected ? `${color}.200` : "unset"}
    >
      <VStack
        spacing={"1"}
        flex={"1"}
        align={"start"}
        padding={"3"}
        bgColor={`whiteAlpha.800`}
        borderRadius={selected ? "2xl" : "1.2rem"}
      >
        <Text fontWeight={"bold"} color={`${color}.900`}>
          My goal name
        </Text>
        <Text as={"b"} color={`${color}.400`} fontSize={"sm"}>
          13 tasks
        </Text>
      </VStack>
      <HStack borderEndRadius={"2xl"} width={"24"} justifyContent={"center"}>
        {/* Place for edit, delete etc. buttons, visible @ hover */}
        <Text fontWeight={"bold"} fontSize={19} color={`${color}.900`}>{`${
          Math.round((7 / 13) * 10000) / 100
        }%`}</Text>
      </HStack>
    </Flex>
  );
};

export { GoalItem };
