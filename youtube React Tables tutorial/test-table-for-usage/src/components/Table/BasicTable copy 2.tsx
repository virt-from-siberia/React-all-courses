/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTable, useSortBy } from "react-table";
import { ColumnProps, useColumns } from "./data/UseColumns";
import "./table.css";
import { TableMenu } from "./TableMenu";
import { Flex } from "@chakra-ui/react";

interface BasicTableProps {
  data: any;
  columns: ColumnProps[];
}

export const BasicTable: React.FC<BasicTableProps> = (props) => {
  const { data, columns } = props;
  const memoizedColumns = useColumns(columns);

  const initialState = { hiddenColumns: ["id"] };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState,
    },
    useSortBy
  );

  return (
    <div>
      <div>
        <TableMenu
          allColumns={allColumns}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        />
      </div>
      <div
        style={{
          height: "90vh",
          overflow: "auto",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          width: "90%",
          position: "relative",
        }}
        className="table-container"
      >
        <table {...getTableProps()} className="content-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  console.log("column", column);

                  return (
                    <th
                      {...column.getHeaderProps({
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                        },
                      })}
                    >
                      <Flex justifyContent={"space-between"}>
                        {column.render("Header")}
                        <div>asd</div>
                      </Flex>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
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
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
};
