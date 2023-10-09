import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

import "./styles/index.scss";

const App = () => {
  const { theme } = useTheme();
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={classNames("app", {}, [theme])}>
      {breadcrumbs.map((item) => {
        console.log("item", item);
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
