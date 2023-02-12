import { Box, IconButton, VStack, FlexProps } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { GoalItem } from "./GoalItem";
import { useContext } from "react";
import { GoalsContext, ModalContext } from "../../contexts";
const GoalList = (props: FlexProps) => {
  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) throw Error("GoalsContext is undefined.");
  const goals = goalsContext[0];

  let modalContext = useContext(ModalContext);
  if (!modalContext) throw Error("modalContext is undefined.");
  return (
    <Box {...props} position="relative">
      <VStack
        alignItems={"stretch"}
        spacing={"4"}
        maxHeight={"100%"}
        overflowY={"scroll"}
        padding={"4"}
        paddingRight={"1"}
        marginRight={"1"}
        borderLeftRadius={{ md: "32" }}
      >
        {goals.map((goal, index) => (
          <GoalItem goal={goal} goalIndex={index} key={goal.id.toString()} />
        ))}
      </VStack>
      <IconButton
        isRound={true}
        onClick={() => {
          if (!modalContext)
            throw Error(
              "modalContext is undefined. Wrong usage of GoalList comonent."
            );
          modalContext.dispatchModal({ type: "setCreate" });
          modalContext.onOpen();
        }}
        aria-label="Create new goal"
        position={"absolute"}
        bottom={"4"}
        right={"6"}
        size={"lg"}
        zIndex={1}
        colorScheme={"teal"}
        icon={<AddIcon boxSize={"8"} />}
      />
    </Box>
  );
};

export { GoalList };
