import { useDisclosure } from "@chakra-ui/react";
import { ObjectId } from "bson";
import { useReducer, useState } from "react";
import { Goal, GoalModalProps, STATUS } from "../types/Index";
// type ModalStateType = {
//   header: string;
//   goal: Goal;
//   //   disclosure: Pick<
//   //     ReturnType<typeof useDisclosure>,
//   //     "isOpen" | "onOpen" | "onClose"
//   //   >;
// };
// const useModalState = (initialState?: ModalStateType) => {
//   return useState<ModalStateType | undefined>(initialState ?? undefined);
// };

const useModalReducer = () => {
  type Action = { type: "setCreate" } | { type: "setEdit"; data: Goal };
  type State = GoalModalProps | {};
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "setCreate":
        return {
          header: "Create a new goal",
          initialValues: {
            id: new ObjectId(),
            name: "",
            created_at: new Date(),
            board_id: new ObjectId(),
            //   TODO: make clor random
            color: "red",
            is_current: false,
            tasks: [
              {
                id: new ObjectId(),
                name: "",
                created_at: new Date(),
                status: STATUS.Pending,
                priority: 1,
              },
            ],
          },
          onSubmit: (x: Goal) => {
            console.log(x);
          },
        };
      case "setEdit":
        return {
          header: "Edit a goal",
          initialValues: action.data,
          onSubmit: (x: Goal) => {
            console.log(x);
          },
        };
      default:
        return state;
    }
  };
  return useReducer(reducer, {});
};

export { useModalReducer };
