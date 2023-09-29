import { Heading, Text, Container, Box, SimpleGrid } from "@chakra-ui/react";

export default function Dashboard() {
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
      <Container as="section" maxWidth="4xl" border="1px solid black" py="20px">
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
      <SimpleGrid p="10px" spacing={10} minChildWidth="450px">
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>

        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>

        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
        <Box bg="white" h="200px" border="1px solid"></Box>
      </SimpleGrid>
    </>
  );
}
