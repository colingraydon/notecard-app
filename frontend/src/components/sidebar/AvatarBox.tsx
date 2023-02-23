import {
  Avatar,
  Box,
  CircularProgress,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useMeQuery } from "../../generated/graphql";

export const AvatarBox = ({ collapse }) => {
  const { data, loading } = useMeQuery();

  return (
    <Box>
      {loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : !data.me ? (
        <Box></Box>
      ) : (
        <Flex
          borderWidth={collapse ? 1 : 0}
          borderColor="gray.100"
          borderRadius="full"
          w="full"
          p={2}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flexDirection={collapse ? "row" : "column-reverse"}
        >
          <Avatar name={data.me?.username} bg="teal.300" />
          {collapse && (
            <Flex
              w="full"
              flexDirection="column"
              gap={4}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
                {data.me?.username}
              </Text>
              <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
                {data.me?.email}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Box>
  );
};
