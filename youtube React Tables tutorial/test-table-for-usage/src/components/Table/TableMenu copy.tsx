/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";

import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";

interface TableMenuProps {
  allColumns: any;
  getToggleHideAllColumnsProps: () => object;
}

export const TableMenu: React.FC<TableMenuProps> = (props) => {
  const { allColumns, getToggleHideAllColumnsProps } = props;

  interface AllToggle {
    onChange: () => void;
    checked: boolean;
  }

  const allToggle = getToggleHideAllColumnsProps() as AllToggle;

  return (
    <Menu closeOnSelect={false}>
      <MenuButton size={"xs"} as={Button} rightIcon={<ChevronDownIcon />}>
        <SettingsIcon />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup title="Настройки таблицы" type="checkbox">
          <Checkbox onChange={allToggle.onChange} isChecked={allToggle.checked}>
            все
          </Checkbox>
          {allColumns.map((column: any) => {
            console.log("props TO CHECKBOX", column.getToggleHiddenProps());
            const x = column.getToggleHiddenProps();

            return (
              <div key={column.id}>
                <Checkbox onChange={x.onChange} isChecked={x.checked}>
                  {column.Header as any}
                </Checkbox>
              </div>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
