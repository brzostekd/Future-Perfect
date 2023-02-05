import { Box, LayoutProps } from "@chakra-ui/react";
import React from "react";
type Props = {
  direction: "row" | "column";
  //  display?: LayoutProps["display"]
};
const Divider: React.FC<Props> = ({
  direction,
  // , display
}) => {
  console.log(direction);

  return (
    <Box
      // display={display ?? "none"}
      backgroundColor={"teal.500"}
      // {...{direction === "column"? {width={{ md: 3 }},height={{ md: "auto" }}}:{}}}
      width={direction === "column" ? 3 : "auto"}
      height={direction === "column" ? "auto" : 3}
      // marginY={{ md: 4 }}
      // rounded={"full"}
    ></Box>
  );
};
export { Divider };
