import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import React from "react";

interface AboutWrapperProps {}

const AboutWrapper: React.FC<AboutWrapperProps> = ({}) => {
  return (
    <Box ml={12}>
      <Heading mt={8}>about</Heading>
      <Stack spacing={8} mt={12} w={600}>
        <Box>my name is colin and i'm terrible at memorization.</Box>
        <Box>
          i've relied on physical notecards for every test i've ever taken, but
          at 700+ notecards for my last exam, i realized i was spending more
          time writing than studying.
        </Box>
        <Box>that's when i created notecard app. </Box>
        <Box>
          notecard app is designed to be as fast and easy to use as possible, so
          you can spend more time studying and less time making notecards.
        </Box>
      </Stack>
      <Box mt={20}>
        if you have any technical issues with the site, please report them{" "}
        <Link href="https://github.com/colingraydon/notecard-app/issues">
          here.
        </Link>
      </Box>
    </Box>
  );
};

export default AboutWrapper;
