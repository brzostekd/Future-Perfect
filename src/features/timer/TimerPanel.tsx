import {
  StackProps,
  VStack,
  Text,
  Button,
  Select,
  Heading,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  GoalsContext,
  SelectedGoalIndexContext,
  TimerContext,
} from "../../contexts";
import { STATUS, Task } from "../../types/Index";
import { Clock } from "./Clock";

const TimerPanel = (props: StackProps) => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isGoalAchieved, setIsGoalAchieved] = useState<boolean | null>(null);

  const timerContext = useContext(TimerContext);
  if (!timerContext) throw Error("timerContext is undefined.");
  const timerDispatch = timerContext[1];

  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) throw Error("goalsContext is undefined.");
  const [goals, dispatchGoals] = goalsContext;

  const selectedGoalIndexContext = useContext(SelectedGoalIndexContext);
  if (!selectedGoalIndexContext)
    throw Error("selectedGoalIndexContext is undefined.");
  const selectedGoalIndex = selectedGoalIndexContext[0];

  const [tasksForOptions, setTasksForOptions] = useState<Task[] | []>(
    selectedGoalIndex !== undefined
      ? goals[selectedGoalIndex].tasks.filter(
          (task) => task.status !== STATUS.Done
        )
      : []
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals]);
  useEffect(() => {
    if (tasksForOptions.length === 0) {
      setSelectedTask(null);
    } else if (
      selectedTask !== null &&
      selectedTask > tasksForOptions.length - 1
    ) {
      setSelectedTask(tasksForOptions.length - 1);
    } else if (isGoalAchieved) setIsGoalAchieved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksForOptions]);

  useEffect(() => {
    setSelectedTask(0);
    setIsGoalAchieved(
      selectedGoalIndex !== undefined &&
        Array(...goals[selectedGoalIndex].tasks).every(
          (task) => task.status === STATUS.Done
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGoalIndex]);

  return (
    <VStack
      {...props}
      alignItems={"stretch"}
      justifyContent={isDisabled ? "start" : "space-between"}
      margin={"5"}
      spacing="3"
    >
      <Clock isDisabled={isDisabled} />
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
            isDisabled={isDisabled}
            variant={"filled"}
            colorScheme={"teal"}
            fontSize={"xl"}
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
            marginTop={"auto !important"}
            isDisabled={isDisabled}
            colorScheme={"teal"}
            onClick={() => {
              if (selectedGoalIndex !== undefined && selectedTask !== null) {
                const goal = goals[selectedGoalIndex];
                if (tasksForOptions.length === 1) {
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

export { TimerPanel };
