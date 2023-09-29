import React from "react";
import { NavLink } from "react-router-dom";

import { List, ListIcon, ListItem } from "@chakra-ui/react";

import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";

export const Sidebar = () => {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem to="/">
        <ListIcon as={CalendarIcon} color="white" />
        <NavLink>Dashboard</NavLink>
      </ListItem>
      <ListItem to="/create">
        <ListIcon as={EditIcon} color="white" />
        <NavLink>New task</NavLink>
      </ListItem>
      <ListItem to="/profile">
        <ListIcon as={AtSignIcon} color="white" />
        <NavLink>Profile</NavLink>
      </ListItem>
    </List>
  );
};
