import React from "react";
import styled from "styled-components";
import { useTable, useSortBy, useBlockLayout } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./colums";

import { useSticky } from "react-table-sticky";

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
    width: 100%; /* Изменено значение */
    height: 70vh; /* Изменено значение */

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }

      display: flex; /* Добавлено значение */
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
      flex: 1;

      :last-child {
        border-right: 0;
      }

      flex: 1; /* Добавлено значение */
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
        width: 100%; /* Изменено значение */
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
        width: 100%; /* Изменено значение */
      }

      .body {
        position: relative;
        z-index: 0;
        width: 100%; /* Изменено значение */
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

export const StickyTable = () => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useBlockLayout,
    useSticky
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = tableInstance;

  const firstPageRows = rows.slice(0, 50);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: "100%", height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
              style={{
                display: "flex",
              }}
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className="th"
                  style={{
                    flex: 1,
                    minWidth: column.minWidth,
                    width: column.width,
                  }}
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <div
                {...row.getRowProps()}
                className="tr"
                style={{
                  display: "flex",
                }}
              >
                {row.cells.map((cell) => (
                  <div
                    {...cell.getCellProps()}
                    className="td"
                    style={{
                      minWidth: cell.column.minWidth,
                      width: cell.column.width,
                    }}
                  >
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="footer">
          {footerGroups.map((footerGroup) => (
            <div
              {...footerGroup.getHeaderGroupProps()}
              className="tr"
              style={{
                display: "flex",
              }}
            >
              {footerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className="td"
                  style={{
                    flex: 1,
                    minWidth: column.minWidth,
                    width: column.width,
                  }}
                >
                  {column.render("Footer")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};
