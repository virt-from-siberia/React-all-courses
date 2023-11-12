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
}

export const TableMenu: React.FC<TableMenuProps> = (props) => {
  const {
    allColumns,
    getToggleHideAllColumnsProps,
    globalFilter,
    setGlobalFilter,
  } = props;

  interface AllToggle {
    onChange: () => void;
    checked: boolean;
  }

  const allToggle = getToggleHideAllColumnsProps() as AllToggle;

  return (
    <Flex>
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
