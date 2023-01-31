import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { VDivider } from "../../components/Vdivider";
import { ModalContext } from "../../contexts";
import { useModalReducer } from "../../state/Index";
import { GoalList } from "../goalList/GoalList";
import { GoalModal } from "../goalModal/GoalModal";
import { Timer } from "../timer/Timer";

const Main: React.FC = () => {
  const [modal, dispatchModal] = useModalReducer();
  return (
    <ModalContext.Provider
      value={{
        modal,
        dispatchModal,
        ...useDisclosure(),
      }}
    >
      <Flex
        justify={"space-between"}
        alignItems={"stretch"}
        width={"100%"}
        height={"100%"}
      >
        <GoalList flex={"1"} />
        <VDivider />
        <Timer flex={"1"} />
        <GoalModal />
      </Flex>
    </ModalContext.Provider>
  );
};
export { Main };
