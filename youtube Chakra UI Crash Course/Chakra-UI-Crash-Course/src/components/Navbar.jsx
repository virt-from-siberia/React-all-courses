import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Flex as="nav" p="10px" alignItems="center" gap="10px" mb="40px">
      <Heading as="h1">Hello world</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Box bg="gray.200" p="10px"></Box>
        <Text>alonso85@mial.ru</Text>
        <Button colorScheme="teal">Logout</Button>
      </HStack>
    </Flex>
  );
};
