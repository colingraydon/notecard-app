import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Logo = ({ collapse }) => (
  <Flex w="full" flexDirection={collapse ? "row" : "column"}>
    <Box mr={collapse ? 41 : 0} display="flex" gap={2}>
      {collapse && (
        <NextLink href="/">
          <Text fontWeight="bold" mr={79} textAlign="end" fontSize={20}>
            StudyUp
          </Text>
        </NextLink>
      )}
    </Box>
  </Flex>
);
