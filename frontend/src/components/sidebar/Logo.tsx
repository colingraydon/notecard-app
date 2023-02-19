import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { AiFillThunderbolt, AiOutlineSearch } from "react-icons/ai";
import { MdMenu } from "react-icons/md";

export const Logo = ({ collapse }) => (
  <Flex
    w="full"
    alignItems="center"
    justifyContent="center"
    flexDirection={collapse ? "row" : "column"}
    // gap={4}
  >
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      {collapse && (
        <Text
          fontWeight="bold"
          mr={79}
          justifyContent="center"
          alignItems="center"
          fontSize={20}
        >
          NotecardApp
        </Text>
      )}
    </Box>
  </Flex>
);
