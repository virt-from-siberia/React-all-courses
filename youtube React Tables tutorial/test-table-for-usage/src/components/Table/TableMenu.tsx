/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Menu,
  MenuButton,
  MenuList,
  Checkbox,
  Button,
  MenuOptionGroup,
  Box,
  Flex,
} from "@chakra-ui/react";

import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { GlobalFilter } from "../GlobalFilter";

interface TableMenuProps {
  allColumns: any;
  getToggleHideAllColumnsProps: () => object;
  setGlobalFilter: (filter: string | undefined) => void;
  globalFilter: string;
  width?: string;
}

export const TableMenu: React.FC<TableMenuProps> = (props) => {
  const {
    allColumns,
    getToggleHideAllColumnsProps,
    globalFilter,
    setGlobalFilter,
    width,
  } = props;

  interface AllToggle {
    onChange: () => void;
    checked: boolean;
  }

  const allToggle = getToggleHideAllColumnsProps() as AllToggle;

  return (
    <Flex
      background={"white"}
      border={"1px solid #f1f1f1"}
      width={width}
      bg={"white"}
      position={"relative"}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: "#fff",
          zIndex: 9,
          top: "26px",
        }}
      />

      <Menu closeOnSelect={false}>
        <MenuButton size={"xs"} as={Button} rightIcon={<ChevronDownIcon />}>
          <SettingsIcon />
        </MenuButton>
        <MenuList>
          <MenuOptionGroup title="Настройки таблицы" type="checkbox">
            <Box p="2">
              <Checkbox
                onChange={allToggle.onChange}
                isChecked={allToggle.checked}
              >
                все
              </Checkbox>
              {allColumns.map((column: any) => {
                const element = column.getToggleHiddenProps();
                return (
                  <div key={column.id}>
                    <Checkbox
                      onChange={element.onChange}
                      isChecked={element.checked}
                    >
                      {column.Header as string}
                    </Checkbox>
                  </div>
                );
              })}
            </Box>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    </Flex>
  );
};
