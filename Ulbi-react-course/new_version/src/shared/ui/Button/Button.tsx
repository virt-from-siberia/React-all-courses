import { classNames } from "shared/lib/classNames/classNames";
import {
  Button as CharkaButton,
  ButtonGroup,
  ButtonProps as ButtonPropsChakra,
} from "@chakra-ui/react";

import cls from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

export enum ThemeButton {
  CLEAR = "clear",
}

interface ButtonProps extends ButtonPropsChakra {
  className?: string;
  theme?: ThemeButton;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...rest } = props;

  return (
    <CharkaButton
      colorScheme="teal"
      size="md"
      className={classNames(cls.clear, {}, [className, cls[theme]])}
      {...rest}
    >
      {children}
    </CharkaButton>
  );
};
