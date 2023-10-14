import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

import { useAppDispatch } from "./providers/StoreProvider/config/store";

import "./styles/index.scss";
import { useEffect } from "react";
import { userActions } from "entities/User";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const breadcrumbs = useBreadcrumbs();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      {breadcrumbs.map((item) => {
        return item.breadcrumb;
      })}

      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
