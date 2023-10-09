import { useState } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

import cls from "./Sidebar.module.scss";

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
      <button data-testid="sidebar-toggle" onClick={onToggle}>
        toggle
      </button>
      <div className={cls.switcher}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
