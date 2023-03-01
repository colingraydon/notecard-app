import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { CollapseContextProvider } from "../components/storage/CollapseContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <CollapseContextProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </CollapseContextProvider>
  );
}

export default MyApp;
