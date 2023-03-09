import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Logo = ({ collapse }) => (
  <Flex w="full" flexDirection={collapse ? "row" : "column"}>
    <Box mr={collapse ? 0 : 0} display="flex" gap={2}>
      {collapse && (
        <NextLink href="/">
          <Text fontWeight="bold" mr={12} fontSize={20}>
            simplify studying
          </Text>
        </NextLink>
      )}
    </Box>
  </Flex>
);
