import { Box, FlexProps } from "@chakra-ui/react";
import React from "react";

const Divider: React.FC<{ direction: "row" | "column" } & FlexProps> = ({
  direction,
  ...flexProps
}) => {
  return (
    <Box
      {...flexProps}
      backgroundColor={"teal.500"}
      width={direction === "column" ? 4 : "auto"}
      height={direction === "column" ? "auto" : 4}
    ></Box>
  );
};
export { Divider };
