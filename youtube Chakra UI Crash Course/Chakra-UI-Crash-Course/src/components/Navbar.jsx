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
    <Flex as="nav" p="10px" alignItems="center" gap="10px">
      <Heading as="h1">Hello world</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Box bg="gray.200" p="10px"></Box>
        <Text>alonso85@mial.ru</Text>
        <Button colorScheme="teal">Logout</Button>
      </HStack>
    </Flex>
    // <Flex bg="gray.200" justify="space-between" wrap="wrap" gap="2">
    //   <Box w="150px" h="50px" bg="red">
    //     1
    //   </Box>
    //   <Box w="150px" h="50px" bg="blue">
    //     2
    //   </Box>
    //   <Box w="150px" h="50px" bg="green" flexGrow="1">
    //     3
    //   </Box>
    //   <Box w="150px" h="50px" bg="yellow" flexGrow="2">
    //     4
    //   </Box>
    // </Flex>
  );
};
