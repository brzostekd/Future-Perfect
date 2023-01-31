import { Center, Container, Flex, VStack } from "@chakra-ui/layout";
import { Text, Box, Card, CardBody } from "@chakra-ui/react";
import { VDivider } from "./components/Vdivider";
import { Main } from "./features/main/Main";
import { Passcode } from "./features/passcode/Passcode";

function App() {
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      height={{ md: "100vh" }}
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
        borderRadius={[null, "32"]}
        boxShadow={{ md: "2xl" }}
        width={["auto", "4xl"]}
        height={["auto", "xl"]}
        backgroundColor={"white"}
      >
        {true ? <Main /> : <Passcode />}
      </Flex>
    </Flex>
  );
}

export default App;
