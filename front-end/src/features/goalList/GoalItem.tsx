import { Flex, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { ObjectId } from "bson";
import { useContext } from "react";
import { ModalContext } from "../../contexts";
import { STATUS } from "../../types/Index";
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
  const BUTTON_SPACE_OFFSET = 10;
  let modalContext = useContext(ModalContext);
  if (!modalContext)
    throw Error(
      "modalContext is undefined. Wrong usage of GoalModal comonent."
    );

  return (
    <Flex
      flexDirection={"row"}
      sx={{
        "&:hover, &:focus-within,": {
          ".animate-visibility": {
            maxWidth: "10rem",
          },
          ".item": {
            marginLeft: -BUTTON_SPACE_OFFSET,
            // transition: "margin 0.5s linear",
          },
        },
        ".animate-visibility ": {
          // display: "none",
          maxWidth: "0px",
          overflow: "hidden",
          transition: "max-width 0.2s ease-in-out",
          // marginRight: "-full",
        },
        ".item": {
          marginLeft: "0",
          transition: "margin 0.2s ease",
        },
      }}
    >
      <VStack
        spacing={"0"}
        align={"start"}
        alignItems={"stretch"}
        className="animate-visibility"
        // zIndex={"0"}
      >
        <Button
          flex={1}
          size={"md"}
          variant={"solid"}
          colorScheme={color}
          borderRadius={"0"}
          bgColor={`${color}.200`}
          color={`${color}.900`}
          _hover={{ "&": { bgColor: `${color}.300` } }}
          borderTopLeftRadius={"1.2rem"}
          onClick={() => {
            if (!modalContext)
              throw Error(
                "modalContext is undefined. Wrong usage of GoalList comonent."
              );
            modalContext.dispatchModal({
              type: "setEdit",
              data: {
                id: new ObjectId(),
                name: "Jump over a gap",
                created_at: new Date(),
                board_id: new ObjectId(),
                //   TODO: make clor random
                color: "blue",
                is_current: false,
                tasks: [
                  {
                    id: new ObjectId(),
                    name: "run for a while",
                    created_at: new Date(),
                    status: STATUS.Pending,
                    priority: 1,
                  },
                  {
                    id: new ObjectId(),
                    name: "jump in the air",
                    created_at: new Date(),
                    status: STATUS.Pending,
                    priority: 2,
                  },
                  {
                    id: new ObjectId(),
                    name: "now over the gap",
                    created_at: new Date(),
                    status: STATUS.Pending,
                    priority: 3,
                  },
                  {
                    id: new ObjectId(),
                    name: "land on my feet",
                    created_at: new Date(),
                    status: STATUS.Pending,
                    priority: 4,
                  },
                ],
              },
            });
            modalContext.onOpen();
          }}
        >
          <Text marginRight={BUTTON_SPACE_OFFSET}>Edit</Text>
        </Button>
        <Button
          flex={1}
          size={"md"}
          variant={"solid"}
          colorScheme={color}
          borderRadius={"0"}
          bgColor={`${color}.200`}
          color={`${color}.900`}
          _hover={{ "&": { bgColor: `${color}.300` } }}
          borderBottomLeftRadius={"1.2rem"}
        >
          <Text marginRight={BUTTON_SPACE_OFFSET}>Delete</Text>
        </Button>
      </VStack>
      <Flex
        as={"button"}
        position={"relative"}
        className={"item"}
        marginLeft={-BUTTON_SPACE_OFFSET}
        flex={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        align={"stretch"}
        bgColor={`${color}.200`}
        borderRadius={"1.2rem"}
        border={selected ? "4px" : 0}
        borderColor={selected ? `${color}.200` : "unset"}
        onClick={(e) => {
          e.preventDefault();
          // if (!("tagName" in target)) return;
          // if (target.tagName !== "BUTTON") console.log(target);
        }}
      >
        <HStack
          flex={"1"}
          bgColor={`whiteAlpha.800`}
          borderRadius={selected ? "2xl" : "1.2rem"}
          align={"stretch"}
        >
          <VStack spacing={"1"} align={"start"} padding={"3"}>
            <Text fontWeight={"bold"} color={`${color}.900`}>
              My goal name
            </Text>
            <Text as={"b"} color={`${color}.400`} fontSize={"sm"}>
              13 tasks
            </Text>
          </VStack>
        </HStack>
        <HStack borderEndRadius={"2xl"} width={"24"} justifyContent={"center"}>
          {/* Place for edit, delete etc. buttons, visible @ hover */}
          <Text fontWeight={"bold"} fontSize={19} color={`${color}.900`}>{`${
            Math.round((7 / 13) * 10000) / 100
          }%`}</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export { GoalItem };
