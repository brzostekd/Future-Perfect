import { Flex } from "@chakra-ui/layout";
import { PasscodeContext, usePasscodeState } from "./contexts";
import { Main } from "./features/main/Main";
import { Passcode } from "./features/passcode/Passcode";

function App() {
  const [passcode, setPascode] = usePasscodeState();
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
      <PasscodeContext.Provider value={[passcode, setPascode]}>
        <Flex
          borderRadius={{ md: 32 }}
          boxShadow={{ md: "2xl" }}
          width={{ base: "full", md: "4xl" }}
          height={{ base: "full", md: "xl" }}
          backgroundColor={"white"}
        >
          {passcode !== undefined ? <Main /> : <Passcode />}
        </Flex>
      </PasscodeContext.Provider>
    </Flex>
  );
}

export default App;
