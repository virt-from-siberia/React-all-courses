import { FC } from "react";
import { AppLink } from "shared/ui/AppLink";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";

import cls from "./SideBarItem.module.scss";
import { SidebarItemType } from "widgets/Sidebar/model/items";

interface SideBarItemProps {
  className?: string;
  item?: SidebarItemType;
}

export const SideBarItem: FC<SideBarItemProps> = (props) => {
  const { item } = props;
  return (
    <AppLink theme={AppLinkTheme.SECONDARY} to={item.path} className={cls.link}>
      {item.text}
    </AppLink>
  );
};
