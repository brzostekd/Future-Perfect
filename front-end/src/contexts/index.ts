import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";
import { useModalReducer } from "../state/Index";
import { GoalModalProps } from "../types/Index";

type modalContextType = {
  modal: ReturnType<typeof useModalReducer>[0];
  dispatchModal: ReturnType<typeof useModalReducer>[1];
} & ReturnType<typeof useDisclosure>;

const ModalContext = createContext<modalContextType | undefined>(undefined);

export { ModalContext };
