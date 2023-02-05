import { Flex, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { ObjectId } from "bson";
import { useContext } from "react";
import {
  GoalsContext,
  ModalContext,
  SelectedGoalIndexContext,
  TimerContext,
} from "../../contexts";
import { COLORS, Goal, STATUS } from "../../types/Index";
const GoalItem = ({ goal, goalIndex }: { goal: Goal; goalIndex: number }) => {
  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) throw Error("goalsContext is undefined..");
  const [goals, dispatchGoals] = goalsContext;

  const BUTTON_SPACE_OFFSET = 2;

  let modalContext = useContext(ModalContext);
  if (!modalContext) throw Error("modalContext is undefined.");

  const selectedGoalIndexContext = useContext(SelectedGoalIndexContext);
  if (!selectedGoalIndexContext)
    throw Error("selectedGoalIndexContext is undefined.");
  const [selectedGoalIndex, setSelectedGoalIndex] = selectedGoalIndexContext;

  const timerContext = useContext(TimerContext);
  if (!timerContext) throw Error("timerContext is undefined.");
  const [timer, timerDispatch] = timerContext;

  return (
    <Flex
      flexDirection={"row"}
      bgColor={`${goal.color}.200`}
      borderRadius={"1.2rem"}
      sx={{
        "&:hover, &:focus-within,": {
          ".animate-visibility": {
            maxWidth: "10rem",
            marginRight: `-${BUTTON_SPACE_OFFSET}rem`,
          },
          // ".item": {
          //   // marginLeft: `${-BUTTON_SPACE_OFFSET}rem`,
          //   // transition: "margin 0.5s linear",
          // },
        },
        "&:focus-within,": {
          ".animate-visibility": {
            overflow: "visible",
          },
          // borderTopLeftRadius: "0rem",
          // borderBottomLeftRadius: "0rem",
        },

        ".animate-visibility ": {
          // display: "none",
          maxWidth: "0px",
          overflow: "hidden",
          marginRight: "0rem",
          transition: "max-width 0.3s ease, margin-right 0.3s ease",
          // marginRight: "-full",
        },
        ".item": {
          marginLeft: "0",
          transition:
            "margin 0.2s ease-out,border-top-left-radius 0.15s ease,border-bottom-left-radius 0.15s ease",
        },
      }}
    >
      <Flex
        direction={"column"}
        align={"start"}
        alignContent={"center"}
        alignItems={"stretch"}
        className="animate-visibility"
        borderLeftRadius={"1.2rem"}
        marginRight={"0rem"}
      >
        <Button
          flex={1}
          size={"md"}
          variant={"solid"}
          colorScheme={goal.color}
          borderRadius={"0"}
          bgColor={`${goal.color}.200`}
          color={`${goal.color}.900`}
          _hover={{ "&": { bgColor: `${goal.color}.300` } }}
          borderTopLeftRadius={"1.2rem"}
          fontWeight={"bold"}
          onClick={() => {
            if (!modalContext) throw Error("modalContext is undefined.");
            modalContext.dispatchModal({
              type: "setEdit",
              data: goal,
            });
            modalContext.onOpen();
          }}
        >
          <Text marginRight={`${BUTTON_SPACE_OFFSET}rem`}>Edit</Text>
        </Button>
        <Button
          flex={1}
          size={"md"}
          variant={"solid"}
          colorScheme={goal.color}
          borderRadius={"0"}
          bgColor={`${goal.color}.200`}
          color={`${goal.color}.900`}
          _hover={{ "&": { bgColor: `${goal.color}.300` } }}
          borderBottomLeftRadius={"1.2rem"}
          overflow={"clip"}
          fontWeight={"bold"}
          onClick={() => {
            if (selectedGoalIndex === goalIndex) {
              setSelectedGoalIndex(undefined);
              timerDispatch({ type: "reset" });
            } else if (
              selectedGoalIndex !== undefined &&
              selectedGoalIndex > goalIndex
            )
              setSelectedGoalIndex(selectedGoalIndex - 1);
            dispatchGoals({
              type: "remove",
              data: { id: goal.id },
            });
          }}
        >
          <Text marginRight={`${BUTTON_SPACE_OFFSET}rem`}>Delete</Text>
        </Button>
      </Flex>
      <Button
        position={"relative"}
        className={"item"}
        display={"flex"}
        flex={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        height={"auto"}
        margin={"0"}
        padding={"0"}
        variant={"ghost"}
        zIndex={1}
        bgColor={`${goal.color}.200`}
        borderRadius={"1.2rem"}
        colorScheme={goal.color.toString()}
        border={goal.is_current ? "4px" : 0}
        borderColor={goal.is_current ? `${goal.color}.200` : "unset"}
        _hover={{ backgroundColor: "none" }}
        onClick={(e) => {
          e.currentTarget.blur();
          const _goal = goals.find((_goal) => _goal.id === goal.id);
          if (_goal && _goal.is_current) return;
          dispatchGoals({
            type: "setCurrent",
            data: { id: goal.id },
          });
          setSelectedGoalIndex(goalIndex);

          timerDispatch({ type: "reset" });
        }}
      >
        <VStack
          flex={"1"}
          bgColor={`whiteAlpha.800`}
          borderRadius={goal.is_current ? "2xl" : "1.2rem"}
          align={"stretch"}
          spacing={"1"}
          padding={"3"}
          textAlign={"start"}
          overflow={"hidden"}
        >
          <Text
            fontWeight={"bold"}
            color={`${goal.color}.900`}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {goal.name}
          </Text>
          <Text as={"b"} color={`${goal.color}.400`} fontSize={"sm"}>
            {`${goal.tasks.length} task${goal.tasks.length > 1 ? "s" : ""}`}
          </Text>
        </VStack>
        <HStack borderEndRadius={"2xl"} width={"24"} justifyContent={"center"}>
          {/* Place for edit, delete etc. buttons, visible @ hover */}
          <Text fontWeight={"bold"} fontSize={19} color={`${goal.color}.900`}>
            {`${(
              (goal.tasks.filter((el) => el.status === STATUS.Done).length /
                goal.tasks.length) *
              100
            ).toLocaleString("pl-PL", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              minimumIntegerDigits: 1,
            })}%`}
          </Text>
        </HStack>
      </Button>
    </Flex>
  );
};

export { GoalItem };
