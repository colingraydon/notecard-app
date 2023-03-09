import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../theme";
import { AppProps } from "next/app";
import { CollapseContextProvider } from "../components/storage/CollapseContextProvider";
import { Chakra } from "../chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <CollapseContextProvider>
    // <Chakra cookies={pageProps.cookies}>
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </Chakra>
    // </CollapseContextProvider>
  );
}

export default MyApp;
