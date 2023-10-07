import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink";

import cls from "./Navbar.module.scss";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.main}>
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.RED} to={"/about"} className={cls.about}>
          О сайте
        </AppLink>
      </div>
    </div>
  );
};
