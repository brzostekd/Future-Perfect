import { useDisclosure } from "@chakra-ui/react";
import { ObjectId } from "bson";
import moment from "moment";
import { createContext, useReducer, useState } from "react";
import {
  colors,
  Goal,
  GoalModalProps,
  STATUS,
  Task,
  Timer,
} from "../types/Index";

const useModalReducer = () => {
  type Action = { type: "setCreate" } | { type: "setEdit"; data: Goal };
  type State = GoalModalProps | {};
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "setCreate":
        return {
          type: "CREATE",
          initialValues: {
            id: new ObjectId(),
            name: "",
            created_at: new Date(),
            board_id: new ObjectId(),
            color: colors[Math.floor(Math.random() * colors.length)],
            is_current: false,
            tasks: [
              {
                id: new ObjectId(),
                name: "",
                // created_at: new Date(),
                status: STATUS.Pending,
                priority: 1,
              },
            ],
          },
        };
      case "setEdit":
        return {
          type: "EDIT",
          initialValues: action.data,
        };
      default:
        return { ...state };
    }
  };
  return useReducer(reducer, {});
};

type modalContextType = {
  modal: ReturnType<typeof useModalReducer>[0];
  dispatchModal: ReturnType<typeof useModalReducer>[1];
} & ReturnType<typeof useDisclosure>;

const ModalContext = createContext<modalContextType | undefined>(undefined);

const useGoalsReducer = () => {
  type Action =
    | { type: "add" | "put"; data: Goal }
    | { type: "setCurrent" | "remove"; data: Pick<Goal, "id"> }
    | {
        type: "setStatus";
        data: { goalId: Goal["id"]; taskId: Task["id"]; status: STATUS };
      };
  type State = Goal[] | [];
  const reducer = (state: State, action: Action): State => {
    const findIndex = (
      arr: Pick<Goal, "id">[],
      id: Goal["id"]
    ): number | undefined => {
      const index = arr.findIndex((value) => (value.id === id ? true : false));
      return index !== -1 ? index : undefined;
    };
    const setCurrent = (index: number, state: State) =>
      state.map((el, i) => {
        if (index === i) {
          el.is_current = true;
        } else if (el.is_current) {
          el.is_current = false;
        }
        return el;
      });
    let goalIndex: ReturnType<typeof findIndex>,
      taskIndex: ReturnType<typeof findIndex>;
    let newState = state.slice();
    switch (action.type) {
      case "add":
        return newState.concat(action.data);
      // return setCurrent(newState.length - 1, newState);
      case "remove":
        goalIndex = findIndex(state, action.data.id);
        if (goalIndex !== undefined) {
          newState.splice(goalIndex, 1);
        }
        return newState;
      case "put":
        goalIndex = findIndex(state, action.data.id);
        if (goalIndex !== undefined) {
          newState.splice(goalIndex, 1, action.data);
          return newState;
        } else return newState;
      case "setCurrent":
        goalIndex = findIndex(state, action.data.id);

        return goalIndex !== undefined
          ? setCurrent(goalIndex, newState)
          : newState;
      case "setStatus":
        goalIndex = findIndex(state, action.data.goalId);
        if (goalIndex !== undefined) {
          taskIndex = findIndex(newState[goalIndex].tasks, action.data.taskId);
          if (taskIndex !== undefined) {
            newState[goalIndex].tasks[taskIndex].status = action.data.status;
          }
        }
        return newState;
      default:
        return state.slice();
    }
  };
  return useReducer(reducer, []);
};

const GoalsContext = createContext<
  ReturnType<typeof useGoalsReducer> | undefined
>(undefined);

const useTimerReducer = () => {
  type Action = { type: "start" | "next" | "pause" | "continue" | "reset" };
  // | { type: "setGoalId"; data: { goalIndex: number | null } };
  const reducer = (state: Timer, action: Action) => {
    const reset = { started_at: null, paused_at: null, ends_at: null };
    const now = new Date();
    switch (action.type) {
      case "next":
        const pattern_step = (state.pattern_step + 1) % state.pattern.length;
        const started_at = new Date();
        return {
          ...state,
          // ...reset,
          pattern_step,
          started_at,
          paused_at: null,
          ends_at: moment(started_at)
            .add(state.pattern[pattern_step], "minutes")
            .toDate(),
        };
      case "pause":
        if (state.started_at) {
          return { ...state, paused_at: new Date() };
        } else return { ...state };

      case "continue":
        return {
          ...state,

          started_at: moment(now)
            .subtract(
              moment(state.paused_at).diff(moment(state.started_at), "ms"),
              "ms"
            )
            .toDate(),
          paused_at: null,
          ends_at: moment(now)
            .add(
              moment(state.ends_at).diff(moment(state.paused_at), "ms"),
              "ms"
            )
            .toDate(),
        };
      case "start":
        return {
          ...state,
          started_at: new Date(),
          ends_at: moment()
            .add(state.pattern[state.pattern_step], "minutes")
            .toDate(),
        };
      case "reset":
        return {
          ...state,
          ...reset,
        };
      // case "setGoalId":
      //   return {
      //     ...state,
      //     goal_index: action.data.goalIndex,
      //     ...reset,
      //   };
      default:
        return { ...state };
    }
  };
  return useReducer(reducer, {
    // task_id: new ObjectId(),
    // goal_index: null,
    started_at: null,
    paused_at: null,
    ends_at: null,
    pattern_step: 0,
    pattern: [15, 5],
  });
};

const TimerContext = createContext<
  ReturnType<typeof useTimerReducer> | undefined
>(undefined);

const useSelectedGoalIndexState = () => useState<number | undefined>(undefined);
const SelectedGoalIndexContext = createContext<
  ReturnType<typeof useSelectedGoalIndexState> | undefined
>(undefined);
const usePasscodeState = () => useState<"string" | null>(null);
const PasscodeContext = createContext<
  ReturnType<typeof usePasscodeState> | undefined
>(undefined);

export {
  useModalReducer,
  ModalContext,
  useGoalsReducer,
  GoalsContext,
  useTimerReducer,
  TimerContext,
  useSelectedGoalIndexState,
  SelectedGoalIndexContext,
  usePasscodeState,
  PasscodeContext,
};
