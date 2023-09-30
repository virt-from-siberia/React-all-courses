import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Logout",
      description: "You have been logged out",
      // status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      icon: <UnlockIcon />,
    });
  };

  return (
    <Flex as="nav" p="10px" alignItems="center" gap="10px" mb="40px">
      <Heading as="h1">Hello world</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Box bg="gray.200" p="10px"></Box>
        <Text>alonso85@mial.ru</Text>
        <Button colorScheme="teal" onClick={showToast}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};
