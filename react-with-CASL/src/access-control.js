import { defineAbility } from "@casl/ability";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";

export const AbilityContext = createContext();

export const Can = createContextualCan(AbilityContext.Consumer);
// console.log("Can", Can);

export const getAbility = (permissions) => {
  return defineAbility((can) => {
    // console.log("can ===>", can);
    Object.keys(permissions).forEach((resource) => {
      permissions[resource].forEach((permission) => {
        can(permission, resource);
      });
    });
  });
};
