import { Box } from "@chakra-ui/react";
import React from "react";
type Props = {
  direction: "row" | "column";
};
const Divider: React.FC<Props> = ({ direction }) => {
  return (
    <Box
      backgroundColor={"teal.500"}
      width={direction === "column" ? 3 : "auto"}
      height={direction === "column" ? "auto" : 3}
    ></Box>
  );
};
export { Divider };
