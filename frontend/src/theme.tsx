import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },

      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  bg: {
    default: "gray.900",
    _dark: "red.100",
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default customTheme;
