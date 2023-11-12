import { useState } from "react";

// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
// import { FilteringTable } from "./components/FilteringTable";
// import { ColumsOrder } from "./components/ColumsOrder";
// import { ColumnHiding } from "./components/ColumnHiding";

import { StickyTable } from "./components/StickyTable";
import { MyVariant } from "./components/MyVariant";

import "./App.css";

function App() {
  return (
    <>
      <div>
        {/* <PaginationTable /> */}
        {/* <FilteringTable /> */}
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
        {/* <ColumsOrder /> */}
        {/* {<ColumnHiding />} */}
        {/* <StickyTable /> */}
        <MyVariant />
      </div>
    </>
  );
}

export default App;
