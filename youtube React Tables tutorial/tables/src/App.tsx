import { useState } from "react";

// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
// import { FilteringTable } from "./components/FilteringTable";
import { ColumsOrder } from "./components/ColumsOrder";
import "./App.css";

function App() {
  return (
    <>
      <div>
        {/* <PaginationTable /> */}
        {/* <FilteringTable /> */}
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
        <ColumsOrder />
      </div>
    </>
  );
}

export default App;
