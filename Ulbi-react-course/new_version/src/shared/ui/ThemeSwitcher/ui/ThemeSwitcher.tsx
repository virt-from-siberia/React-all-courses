import { classNames } from "shared/lib/classNames/classNames";

import { useTheme } from "app/providers/ThemeProvider";

import cls from "./ThemeSwitcher.module.scss";

import IconSVG from "shared/assets/icons/multimedia.svg";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { toggleTheme } = useTheme();

  return (
    <button
      className={classNames(cls.themeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      Toggle
      <IconSVG />
    </button>
  );
};
