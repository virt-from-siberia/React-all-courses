import { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar/ui/Sidebar";

import "./styles/index.scss";
import { Modal } from "widgets/Sidebar/ui/Modal";

const App = () => {
  const { theme } = useTheme();
  const [opened, setOpened] = useState(true);
  const breadcrumbs = useBreadcrumbs();

  const onClose = () => {
    setOpened(false);
  };

  return (
    <div className={classNames("app", {}, [theme])}>
      {breadcrumbs.map((item) => {
        return item.breadcrumb;
      })}
      <button
        style={{
          border: "1px solid black",
          margin: "10px",
          padding: "5px",
          borderRadius: "8px",
        }}
        onClick={() => setOpened(true)}
      >
        toggle modal
      </button>
      <Navbar />
      <Modal isOpen={opened} onClose={onClose} />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
