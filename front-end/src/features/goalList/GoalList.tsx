import {
  Box,
  IconButton,
  StackProps,
  VStack,
  Text,
  Flex,
  FlexProps,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { GoalItem } from "./GoalItem";
import { useContext } from "react";
import { ModalContext } from "../../contexts";
const GoalList = (props: FlexProps) => {
  const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
    "blue",
    "purple",
    "pink",
  ] as const;
  // const { isOpen, onOpen, onClose } = useDisclosure();

  let modalContext = useContext(ModalContext);
  if (!modalContext)
    throw Error("modalContext is undefined. Wrong usage of GoalList comonent.");
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
        <GoalItem selected={true} />
        {COLORS.map((c) => (
          <GoalItem key={c} color={c} />
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
        colorScheme={"teal"}
        shadow={"base"}
        icon={<AddIcon boxSize={"6"} />}
      />
    </Box>
  );
};

export { GoalList };
