import { Link, LinkProps } from "react-router-dom";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RED = "red",
}

interface AppLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...rest
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.navbar, {}, [className, cls[theme]])}
      {...rest}
    >
      {children}
    </Link>
  );
};
