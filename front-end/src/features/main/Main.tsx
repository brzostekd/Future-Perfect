import {
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Divider } from "../../components/Divider";
import {
  ModalContext,
  GoalsContext,
  useGoalsReducer,
  SelectedGoalIndexContext,
  useSelectedGoalIndexState,
  useTimerReducer,
  TimerContext,
} from "../../contexts";
import { useModalReducer } from "../../contexts";
import { GoalList } from "../goalList/GoalList";
import { GoalModal } from "../goalModal/GoalModal";
import { Timer } from "../timer/Timer";

const Main: React.FC = () => {
  const [modal, dispatchModal] = useModalReducer();
  const modalDisclosure = useDisclosure();
  const [goals, dispatchGoals] = useGoalsReducer();
  const [selectedGoalIndex, setSelectedGoalIndex] = useSelectedGoalIndexState();
  const [timer, timerDispatch] = useTimerReducer();

  // const DISPLAY =
  //   useBreakpointValue<"none" | "block">({
  //     base: "block",
  //     sx: "none",
  //   }) ?? "block";

  const DIR =
    useBreakpointValue<"row" | "column">({
      base: "row",
      md: "column",
    }) ?? "column";
  return (
    <ModalContext.Provider
      value={{
        modal,
        dispatchModal,
        ...modalDisclosure,
      }}
    >
      <GoalsContext.Provider value={[goals, dispatchGoals]}>
        <SelectedGoalIndexContext.Provider
          value={[selectedGoalIndex, setSelectedGoalIndex]}
        >
          <TimerContext.Provider value={[timer, timerDispatch]}>
            <Flex
              justify={"space-between"}
              alignItems={"stretch"}
              width={"100%"}
              height={"100%"}
              direction={{ base: "column-reverse", md: "row" }}
            >
              <GoalList flex={{ base: "1" }} minWidth={0} minHeight={0} />
              <Divider direction={DIR} />
              <Timer flex={{ base: "2", md: "1" }} minWidth={0} minHeight={0} />
              <GoalModal
                onCreate={(values) => {
                  modalDisclosure.onClose();
                  if (goals.length == 0) {
                    dispatchGoals({ type: "add", data: values });
                    dispatchGoals({
                      type: "setCurrent",
                      data: { id: values.id },
                    });
                    setSelectedGoalIndex(0);
                  } else dispatchGoals({ type: "add", data: values });
                  // timerDispatch({ type: "reset" });
                }}
                onEdit={(values) => {
                  modalDisclosure.onClose();
                  dispatchGoals({ type: "put", data: values });
                }}
              />
            </Flex>
          </TimerContext.Provider>
        </SelectedGoalIndexContext.Provider>
      </GoalsContext.Provider>
    </ModalContext.Provider>
  );
};
export { Main };
