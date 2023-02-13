import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Intro } from "./features/intro/Intro";
import { Main } from "./features/main/Main";

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
        boxShadow={{ md: "2xl" }}
        width={{ base: "full", md: "4xl" }}
        height={{ base: "full", md: "xl" }}
        backgroundColor={"white"}
      >
        {showIntro ? <Intro onClick={() => setShowIntro(false)} /> : <Main />}
      </Flex>
    </Flex>
  );
}

export default App;
