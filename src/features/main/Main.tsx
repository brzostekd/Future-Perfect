import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
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
import { Goal } from "../../types/Index";
import { getGoalsFromLS } from "../../utils";
import { GoalList } from "../goalList/GoalList";
import { GoalModal } from "../goalModal/GoalModal";
import { TimerPanel } from "../timer/TimerPanel";
const Main: React.FC = () => {
  const [modal, dispatchModal] = useModalReducer();
  const modalDisclosure = useDisclosure();
  const [goals, dispatchGoals] = useGoalsReducer();
  const [selectedGoalIndex, setSelectedGoalIndex] = useSelectedGoalIndexState();
  const [timer, timerDispatch] = useTimerReducer();

  const writeGoalsToLS = () => {
    localStorage.setItem("goals", JSON.stringify(goals));
  };

  useEffect(() => {
    localStorage.setItem("test", "tesst");
    const goalsFromLS = getGoalsFromLS();
    if (!goalsFromLS) return;
    dispatchGoals({ type: "set", data: goalsFromLS });
    for (let i = 0; i < goalsFromLS.length; i++) {
      const element = goalsFromLS[i] as Goal;
      if (element.is_current) {
        setSelectedGoalIndex(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", writeGoalsToLS);
    // window.addEventListener("unload", writeGoalsToLS);
    // window.addEventListener("beforeunload", writeGoalsToLS);
    return () => {
      document.removeEventListener("visibilitychange", writeGoalsToLS);
      // window.removeEventListener("unload", writeGoalsToLS);
      // window.removeEventListener("beforeunload ", writeGoalsToLS);
    };
  }, [goals]);

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
              <GoalList
                flex={{ base: "1" }}
                minWidth={"0"}
                minHeight={{ base: "10rem" }}
              />
              <Divider
                flexShrink={0}
                minWidth={"0"}
                minHeight={"auto"}
                direction={DIR}
              />
              <TimerPanel
                flex={{ base: "2", md: "1" }}
                minWidth={"0"}
                minHeight={{ base: "auto", sm: "0" }}
              />
              <GoalModal
                onCreate={(values) => {
                  modalDisclosure.onClose();
                  if (goals.length === 0) {
                    dispatchGoals({ type: "add", data: values });
                    dispatchGoals({
                      type: "setCurrent",
                      data: { id: values.id },
                    });
                    setSelectedGoalIndex(0);
                  } else dispatchGoals({ type: "add", data: values });
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
