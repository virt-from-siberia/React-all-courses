import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NavHoverBox from "../components/NavHoverBox";

export default function NavItem({ icon, title, description, active, navSize }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      position="relative" // Добавьте относительное позиционирование
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#AEC8CA" : "transparent"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : "auto"}
        >
          <MenuButton w="100%">
            <Flex>
              <Flex
                position="absolute"
                left={navSize === "small" ? "0" : "0"}
                top={"10px"}
                align="center"
                justify="center"
                w="40px"
              >
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? "#82AAAD" : "gray.500"}
                />
              </Flex>
              <Text
                ml={navSize === "small" ? "50px" : "25px"}
                display={navSize === "small" ? "none" : "flex"}
                position={"relative"}
                top={"-4px"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
