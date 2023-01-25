import { Box } from "@chakra-ui/react";
import React from "react";

const VDivider: React.FC = () => {
  return (
    <Box
      backgroundColor={"teal.500"}
      width={{ md: 3 }}
      height={{ md: "auto" }}
      // marginY={{ md: 4 }}
      // rounded={"full"}
    ></Box>
  );
};
export { VDivider };
