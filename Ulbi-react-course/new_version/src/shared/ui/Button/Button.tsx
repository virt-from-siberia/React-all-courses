import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

export enum ThemeButton {
  CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...rest } = props;

  return (
    <button
      className={classNames(cls.clear, {}, [className, cls[theme]])}
      {...rest}
    >
      {children}
    </button>
  );
};
