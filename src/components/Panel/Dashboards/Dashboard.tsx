// Chakra imports
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

import React from "react";
function Dashboard() {
  return (
    <>
      <Flex justifyContent={"space-evenly"} p="3">
        <Box
          width="container.md"
          // width="100"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
          m={4}
        >
          <Heading as="h2" size="md" mb={2}>
            Product Details
          </Heading>
          <Text fontSize="md">Total Produt: 50</Text>
        </Box>

        <Box
          width="container.md"
          // width="100"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={2}
          m={4}
        >
          <Heading as="h2" size="md" mb={2}>
            Order Details
          </Heading>
          <Text fontSize="md">Total Order: 23</Text>
        </Box>
      </Flex>
    </>
  );
}
export default Dashboard;
