import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ClockCircle } from "./ClockCircle";
import { MdPause, MdPlayArrow, MdRestartAlt, MdSkipNext } from "react-icons/md";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { TimerContext } from "../../contexts";

const Clock = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  const timerContext = useContext(TimerContext);
  if (!timerContext) throw Error("timerContext is undefined.");
  const [timer, timerDispatch] = timerContext;

  const [fraction, setFraction] = useState(1);
  const [timeDisplay, setTimeDisplay] = useState([0, 0]);

  useEffect(() => {
    if (!timer.paused_at) {
      if (timer.started_at) {
        const loop = () => {
          const durationValue =
            timer.ends_at.valueOf() - timer.started_at.valueOf();
          const fraction =
            (timer.ends_at.valueOf() -
              (timer.paused_at ?? Date.now()).valueOf()) /
            durationValue;

          if (fraction < 0) {
            setFraction(() => {
              return 0;
            });

            setTimeout(() => timerDispatch({ type: "next" }), 1000);
            clearInterval(intervalId);
          } else
            setFraction(() => {
              return fraction;
            });
        };

        loop();
        const intervalId = setInterval(loop, 1000);
        return () => clearInterval(intervalId);
      } else setFraction(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    const now = moment(timer.paused_at ?? new Date());
    const ends_at = moment(timer.ends_at);
    if (timer.started_at || now < ends_at) {
      const seconds = ends_at.diff(now, "seconds");
      const m = Math.floor(seconds / 60);

      setTimeDisplay([m, seconds - m * 60]);
    } else setTimeDisplay([0, 0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraction]);

  const phase = timer.pattern_step % 2 === 0;
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      minWidth={0}
      minHeight={0}
      flex={3}
      userSelect={"none"}
    >
      <ClockCircle fraction={fraction}></ClockCircle>
      <VStack position={"absolute"} spacing={{ base: "1", sm: "2" }}>
        <Heading
          fontSize={{ base: "7xl", sm: "8xl" }}
        >
          {timeDisplay.map((v) => v.toString().padStart(2, "0")).join(":")}
        </Heading>
        <Box
          padding={"3"}
          backgroundColor={phase ? "blackAlpha.100" : "gray.800"}
          color={phase ? "initial" : "white"}
          borderRadius={"2xl"}
        >
          <Text as={"b"}>{phase ? "WORK" : "BREAK"}</Text>
        </Box>
        <HStack>
          {[
            {
              as: MdSkipNext,
              onClick: () => {
                timerDispatch({ type: "next" });
              },
              ariaLabel: "Next",
            },
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
              as: MdRestartAlt,
              onClick: () => {
                timerDispatch({ type: "reset" });
              },
              ariaLabel: "Reset",
            },
          ]
            .filter((element) => {
              if (timer.started_at) {
                return [
                  timer.paused_at ? "Play" : "Pause",
                  "Next",
                  "Reset",
                ].includes(element.ariaLabel);
              } else return ["Start"].includes(element.ariaLabel);
            })
            .map((element) => (
              <Tooltip label={element.ariaLabel} key={element.ariaLabel}>
                <IconButton
                  isDisabled={isDisabled}
                  backgroundColor={"blackAlpha.100"}
                  size={"lg"}
                  icon={<Icon boxSize={"6"} as={element.as}></Icon>}
                  aria-label={element.ariaLabel}
                  isRound={true}
                  onClick={element.onClick}
                />
              </Tooltip>
            ))}
        </HStack>
      </VStack>
    </Flex>
  );
};

export { Clock };
