import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUP_COLUMNS } from "./colums";

import "./table.css";

export const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  return (
    <>
      <div
        style={{
          height: "90vh",
          overflow: "auto",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px ",
          width: "90%",
        }}
        className="table-container"
      >
        {/* <div>
        <div>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              {...getToggleHideAllColumnsProps()}
            />
            {allColumns.map((column) => {
              return (
                <div key={column.id}>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />
                  {column.Header}
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
        <table {...getTableProps()} className="content-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })}
                  >
                    {column.render("Header")}
                    {/* <span>{column.isSortedDesc ? " 🔽" : " 🔼"}</span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    console.log("cell.column", cell.column);
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => {
                  return (
                    <td {...column.getFooterProps()}>
                      {/* <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "#009879",
                        }}
                      /> */}

                      <div
                        style={{
                          borderTop: "3px solid #009879",
                          padding: "5px 10px",
                          // width: "100%",
                          // height: "3px",
                          // background: "#009879",
                        }}
                      >
                        {column.render("Footer")}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  );
};
