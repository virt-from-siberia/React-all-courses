import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ErrorPage.module.scss";
import { Button } from "shared/ui/Button";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ className }) => {
  const reloadPage = () => location.reload();

  return (
    <div className={classNames(cls.errorPage, {}, [className])}>
      ErrorPage
      <Button onClick={reloadPage}>Reload page</Button>
    </div>
  );
};
