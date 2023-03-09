import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { blue, clickBlue, hoverBlue } from "../../styles/themes/Lightmode";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      mr={2}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label="Toggle Theme"
      colorScheme="messenger"
      onClick={toggleColorMode}
      background={blue}
      _hover={{ background: hoverBlue }}
      _active={{ background: clickBlue }}
    />
  );
};
