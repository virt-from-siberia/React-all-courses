import { useLoaderData } from "react-router-dom";

import {
  Heading,
  Text,
  Container,
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Button,
  Divider,
} from "@chakra-ui/react";

import { EditIcon, ViewIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  const tasks = useLoaderData();

  const boxStyles = {
    bg: "tomato",
    color: "white",
    p: "20px",
    borderRadius: "10px",
    ":hover": {
      color: "black",
      bg: "blue.200",
    },
  };

  return (
    <>
      <Container as="section" maxWidth="4xl" py="20px" mb="30px">
        <Heading my="30px" p="10px">
          Chakra uo components
        </Heading>
        <Text ml="30px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nihil?
        </Text>
        <Text ml="30px" color="blue.400" fontWeight="bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nihil?
        </Text>
        <Box my="30px" p="20px" bg="orange">
          <Text color="white">This is a box</Text>
        </Box>
        <Box sx={boxStyles}>Hello virt</Box>
      </Container>

      <SimpleGrid spacing={10} minChildWidth="300px">
        {tasks &&
          tasks.map((task) => (
            <Card
              key={task.id}
              p="10px"
              borderTop="8px"
              borderColor="purple.400"
              bg="white"
            >
              <CardHeader>
                <Flex gap={5}>
                  <Box w="50px" h="50px">
                    <Text>AV</Text>
                  </Box>
                  <Box>
                    <Heading as="h3" size="sm">
                      {task.title}
                    </Heading>
                    <Text>by {task.author}</Text>
                  </Box>
                </Flex>
              </CardHeader>

              <CardBody color="gray.500">
                <Text> {task.description}</Text>
              </CardBody>

              <Divider color="gray.300" />

              <CardFooter>
                <HStack>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    leftIcon={<ViewIcon />}
                  >
                    Watch
                  </Button>
                  <Button colorScheme="teal" leftIcon={<EditIcon />}>
                    Comment
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
}

export const tasksLoader = async () => {
  const res = await fetch("http://localhost:3000/tasks");
  return res.json();
};
