import { Avatar, Box, CircularProgress, Flex, Text } from "@chakra-ui/react";
import { useMeEmailQuery } from "../../generated/graphql";
import { blue, green, testgreen } from "../../styles/themes/Lightmode";

export const AvatarBox = ({ collapse }) => {
  const { data, loading } = useMeEmailQuery();
  // const { data: dataMe, loading: loadingMe } = useMeQuery();

  return (
    <Box>
      {loading ? (
        <CircularProgress isIndeterminate value={50} />
      ) : !data.meEmail ? (
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
          <Avatar name={data.meEmail?.username} bg={blue} />
          {collapse && (
            <Flex
              w="full"
              flexDirection="column"
              gap={4}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
                {data.meEmail?.username}
              </Text>
              <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
                {data.meEmail?.email.length <= 28
                  ? data.meEmail?.email
                  : data.meEmail?.email.substring(0, 26) + "..."}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Box>
  );
};
