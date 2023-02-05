import {
  StackProps,
  VStack,
  Text,
  Button,
  Select,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  GoalsContext,
  SelectedGoalIndexContext,
  TimerContext,
  useTimerReducer,
} from "../../contexts";
import { STATUS, Task } from "../../types/Index";
import { Clock } from "./Clock";

const Timer = (props: StackProps) => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isGoalAchieved, setIsGoalAchieved] = useState<boolean | null>(null);

  const timerContext = useContext(TimerContext);
  if (!timerContext) throw Error("timerContext is undefined.");
  const [timer, timerDispatch] = timerContext;

  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) throw Error("goalsContext is undefined.");
  const [goals, dispatchGoals] = goalsContext;

  const selectedGoalIndexContext = useContext(SelectedGoalIndexContext);
  if (!selectedGoalIndexContext)
    throw Error("selectedGoalIndexContext is undefined.");
  const [selectedGoalIndex, setSelectedGoalIndex] = selectedGoalIndexContext;

  const [tasksForOptions, setTasksForOptions] = useState<Task[] | []>(
    selectedGoalIndex !== undefined
      ? goals[selectedGoalIndex].tasks.filter(
          (task) => task.status !== STATUS.Done
        )
      : []
  );
  // const s =
  //   selectedGoalIndex !== undefined &&
  //   Array(...goals[selectedGoalIndex].tasks).every(
  //     (task) => task.status === STATUS.Done
  //   );
  const isDisabled =
    selectedGoalIndex === undefined || tasksForOptions.length === 0;

  useEffect(() => {
    if (selectedGoalIndex !== undefined) {
      setTasksForOptions(
        goals[selectedGoalIndex].tasks.filter(
          (task) => task.status !== STATUS.Done
        )
      );
    }
  }, [goals]);
  useEffect(() => {
    if (tasksForOptions.length == 0) {
      setSelectedTask(null);
    } else if (
      selectedTask !== null &&
      selectedTask > tasksForOptions.length - 1
    ) {
      setSelectedTask(tasksForOptions.length - 1);
    } else if (isGoalAchieved) setIsGoalAchieved(false);
  }, [tasksForOptions]);

  useEffect(() => {
    setSelectedTask(0);
    setIsGoalAchieved(
      selectedGoalIndex !== undefined &&
        Array(...goals[selectedGoalIndex].tasks).every(
          (task) => task.status === STATUS.Done
        )
    );

    // if (
    //   selectedGoalIndex !== undefined &&
    //   Array(...goals[selectedGoalIndex].tasks).every(
    //     (task) => task.status === STATUS.Done
    //   )
    // ) {
    //   setIsGoalAchieved(true);
    //   timerDispatch({ type: "reset" });
    // }
  }, [selectedGoalIndex]);

  return (
    <VStack
      {...props}
      alignItems={"stretch"}
      justifyContent={isDisabled ? "start" : "space-between"}
      margin={{ sm: "5" }}
      marginY={{ base: "5" }}
      spacing="3"
      // height={"10rem"}
    >
      <Clock isDisabled={isDisabled} timerReducer={[timer, timerDispatch]} />
      {isGoalAchieved ? (
        <VStack minWidth={0} minHeight={0} justify={"center"} flex={1}>
          <Heading color={"teal"} textAlign={"center"}>
            Goal achieved!
          </Heading>
        </VStack>
      ) : (
        <VStack minWidth={0} minHeight={0} flex={1} alignItems={"stretch"}>
          <Text fontSize={"md"} textAlign={"center"}>
            Current task:
          </Text>
          <Select
            // defaultValue={1}
            isDisabled={isDisabled}
            variant={"filled"}
            colorScheme={"teal"}
            fontSize={"xl"}
            // textAlign={"center"}
            value={selectedTask ?? 0}
            onChange={(e) => {
              const value = Number(e.target.value) as number;
              setSelectedTask(isNaN(value) ? 0 : value);
            }}
          >
            {selectedGoalIndex !== undefined &&
              tasksForOptions.map((task, index) => {
                return (
                  <option
                    key={task.id.toString()}
                    value={index}
                  >{`${task.priority}. ${task.name}`}</option>
                );
              })}
          </Select>
          <Button
            isDisabled={isDisabled}
            colorScheme={"teal"}
            onClick={() => {
              if (selectedGoalIndex !== undefined && selectedTask !== null) {
                const goal = goals[selectedGoalIndex];
                if (tasksForOptions.length === 1) {
                  console.log("SSSADSAA");

                  timerDispatch({ type: "reset" });
                  setIsGoalAchieved(true);
                }
                dispatchGoals({
                  type: "setStatus",
                  data: {
                    goalId: goal.id,
                    taskId: tasksForOptions[selectedTask].id,
                    status: STATUS.Done,
                  },
                });
              }
            }}
          >
            MARK DONE
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

export { Timer };
