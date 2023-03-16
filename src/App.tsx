import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Intro } from "./features/intro/Intro";
import { Main } from "./features/main/Main";
import { Image } from "@chakra-ui/react";
import ribbon from "./svg/ribbon.svg";
function App() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("goals")) setShowIntro(false);
  }, []);
  return (
    <Flex
      justify={"center"}
      alignItems={{ md: "center" }}
      height={"100vh"}
      backgroundColor={"teal.50"}
      sx={{
        "*::-webkit-scrollbar": { width: "3", paddingRight: "2px" },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "blackAlpha.200",
          borderRadius: "full",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "blackAlpha.300",
        },
      }}
    >
      <Flex
        borderRadius={{ md: 32 }}
        width={{ base: "full", md: "4xl" }}
        height={{ base: "full", md: "xl" }}
        backgroundColor={"white"}
        position={"relative"}
      >
        <Box
          width="inherit"
          height="inherit"
          borderRadius={"inherit"}
          zIndex={3}
          bgColor="inherit"
          boxShadow={{ md: "2xl" }}
        >
          {showIntro ? <Intro onClick={() => setShowIntro(false)} /> : <Main />}
        </Box>
        <Image
          display={{ base: "none", md: "initial" }}
          bottom={"-16%"}
          left={"23%"}
          position={"absolute"}
          transform={"rotate(4deg)"}
          zIndex={1}
          src={ribbon}
          width={"12rem"}
          draggable="false"
        ></Image>
      </Flex>
    </Flex>
  );
}

export default App;
