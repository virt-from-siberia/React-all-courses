import { useState } from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";

import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

import { AppLink } from "shared/ui/AppLink";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";

import cls from "./Sidebar.module.scss";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

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
      <div className={cls.items}>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.link}>
          Главная
        </AppLink>
        <AppLink
          theme={AppLinkTheme.RED}
          to={RoutePath.about}
          className={cls.link}
        >
          О сайте
        </AppLink>
      </div>
      <div className={cls.switcher}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
