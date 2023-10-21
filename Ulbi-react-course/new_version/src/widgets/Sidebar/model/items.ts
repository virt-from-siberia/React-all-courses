import { RoutePath } from "shared/config/routeConfig/routeConfig";

export interface SidebarItemType {
  path: string;
  text: string;
  icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: "Главная",
  },
  {
    path: RoutePath.about,
    text: "О сайте",
  },
  {
    path: RoutePath.profile,
    text: "Профиль",
  },
];
