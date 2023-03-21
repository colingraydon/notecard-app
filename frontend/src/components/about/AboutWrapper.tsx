import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import React from "react";

interface AboutWrapperProps {}

const AboutWrapper: React.FC<AboutWrapperProps> = ({}) => {
  return (
    <Box ml={12}>
      <Heading mt={8}>about</Heading>
      <Stack spacing={8} mt={12} w={450}>
        <Box>my name is colin graydon and i'm terrible at memorization.</Box>
        <Box>
          after making over 500 physical note cards for my last exam, i realized
          i was spending more time making cards than studying.
        </Box>
        <Box>that's when i created simplify studying. </Box>
        <Box>
          simplify studying is designed to be as fast and easy to use as
          possible, so you can spend more time studying and less time making
          notecards. i hope that using this site helps you ace your next test,
          pass a licensing exam, or prepare for an interview.
        </Box>
      </Stack>
      <Box mt={20} w={450}>
        <Link href="https://github.com/colingraydon/notecard-app/issues">
          please report any technical issues here.
        </Link>
      </Box>
    </Box>
  );
};

export default AboutWrapper;
