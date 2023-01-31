import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ClockCircle } from "./ClockCircle";
import { MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { ObjectId } from "bson";
import moment from "moment";
import { Timer } from "../../types/Index";
import { useEffect, useReducer, useState } from "react";

const Clock = () => {
  // { fraction }: { fraction: number }
  type Action = { type: "start" | "next" | "pause" | "continue" | "reset" };
  const [timer, timerDispatch] = useReducer(
    (state: Timer, action: Action) => {
      const now = new Date();
      switch (action.type) {
        case "next":
          const pattern_step = (state.pattern_step + 1) % state.pattern.length;
          const started_at = new Date();
          return {
            ...state,
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
            ends_at: moment().add(state.pattern[0], "minutes").toDate(),
          };
        case "reset":
          return {
            ...state,
            started_at: null,
            paused_at: null,
            ends_at: null,
          };
        default:
          return { ...state };
      }
    },
    {
      task_id: new ObjectId(),
      goal_id: new ObjectId(),
      started_at: null,
      paused_at: null,
      ends_at: null,
      pattern_step: 0,
      pattern: [1, 0.5],
    }
  );

  const [fraction, setFraction] = useState(1);
  const [timeDisplay, setTimeDisplay] = useState([12, 0]);

  useEffect(() => {
    if (timer.started_at && !timer.paused_at) {
      const loop = () => {
        const durationValue =
          timer.ends_at.valueOf() - timer.started_at.valueOf();
        const fraction =
          (timer.ends_at.valueOf() -
            (timer.paused_at ?? Date.now()).valueOf()) /
          durationValue;

        setFraction(() => {
          return fraction;
        });

        if (fraction < 0)
          setTimeout(() => timerDispatch({ type: "next" }), 1000);
      };

      loop();
      const intervalId = setInterval(loop, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);
  useEffect(() => {
    if (timer.started_at) {
      const now = moment(timer.paused_at ?? new Date());
      const ends_at = moment(timer.ends_at);
      const m = ends_at.diff(now, "minute");
      const s = ends_at.diff(now, "second");
      setTimeDisplay([m, s]);
    }
  }, [fraction]);
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      marginX={"6"}
      position={"relative"}
    >
      <ClockCircle fraction={fraction}></ClockCircle>
      <VStack position={"absolute"}>
        <Heading fontSize={"7xl"} marginTop={"4"}>
          {timeDisplay.map((v) => v.toString().padStart(2, "0")).join(":")}
        </Heading>
        <Box
          padding={"3"}
          backgroundColor={"blackAlpha.100"}
          borderRadius={"2xl"}
        >
          <Text as={"b"}>
            {timer.pattern_step % 2 === 0 ? "WORK" : "BREAK"}
          </Text>
        </Box>
        <HStack>
          {[
            {
              as: MdPlayArrow,
              onClick: () => {
                timerDispatch({ type: "continue" });
              },
              ariaLabel: "Play",
            },
            {
              as: MdPause,
              onClick: () => {
                timerDispatch({ type: "pause" });
              },
              ariaLabel: "Pause",
            },
            {
              as: MdPlayArrow,
              onClick: () => {
                timerDispatch({ type: "start" });
              },
              ariaLabel: "Start",
            },
            {
              as: MdSkipNext,
              onClick: () => {
                timerDispatch({ type: "next" });
              },
              ariaLabel: "Next",
            },
          ]
            .filter((element) => {
              if (timer.started_at) {
                if (timer.paused_at) {
                  return ["Play", "Next"].includes(element.ariaLabel);
                } else {
                  return ["Pause", "Next"].includes(element.ariaLabel);
                }
              } else return element.ariaLabel === "Start";
            })
            .map((element) => (
              <IconButton
                key={element.ariaLabel}
                backgroundColor={"blackAlpha.100"}
                size={"lg"}
                icon={<Icon boxSize={"6"} as={element.as}></Icon>}
                aria-label={element.ariaLabel}
                isRound={true}
                onClick={element.onClick}
              />
            ))}
        </HStack>
      </VStack>
    </Flex>
  );
};

export { Clock };
