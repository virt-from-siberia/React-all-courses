import { classNames } from "shared/lib/classNames/classNames";

import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      <h1>Page not found</h1>
    </div>
  );
};
