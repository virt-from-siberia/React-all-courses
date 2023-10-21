import { useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";

import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

import cls from "./Sidebar.module.scss";
import { SidebarItemList } from "widgets/Sidebar/model/items";
import { SideBarItem } from "../SideBarItem/SideBarItem";
interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => {
    return SidebarItemList.map((item) => (
      <SideBarItem item={item} key={item.path} />
    ));
  }, [SidebarItemList]);

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        size="sm"
        data-testid="sidebar-toggle"
        colorScheme="blue"
        onClick={onToggle}
        className={cls.collapsedButton}
      >
        {collapsed ? ">" : "<"}
      </Button>
      <div className={cls.items}>{itemsList}</div>
      <div className={cls.switcher}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
