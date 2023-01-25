import { Flex, Text } from "@chakra-ui/react";
import { VDivider } from "../../components/Vdivider";
import GoalList from "../goalList/GoalList";
import Timer from "../timer/Timer";

const Main: React.FC = () => {
  return (
    <>
      <Flex
        justify={"space-between"}
        alignItems={"stretch"}
        width={"100%"}
        height={"100%"}
      >
        <GoalList flex={"1"}></GoalList>
        <VDivider></VDivider>
        <Timer flex={"1"}></Timer>
      </Flex>
    </>
  );
};
export { Main };
