import { useState } from "react";

// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
import { FilteringTable } from "./components/FilteringTable";

import "./App.css";

function App() {
  return (
    <>
      <div>
        <FilteringTable />
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
      </div>
    </>
  );
}

export default App;
