/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  ColumnGroup,
  HeaderGroup,
  ColumnInstance,
} from "react-table";
import { Flex } from "@chakra-ui/react";

import { ColumnProps, useColumns } from "./data/UseColumns";
import "./table.css";
import { TableMenu } from "./TableMenu";

interface TableStyles {
  tableHeight?: string;
  tableWidth?: string;
}

interface BasicTableProps {
  data: any;
  columns: ColumnProps[];
  tableStyles: TableStyles;
}

export const BasicTable: React.FC<BasicTableProps> = (props) => {
  const { data, columns, tableStyles } = props;
  const memoizedColumns = useColumns(columns);

  const tableContainerStyle: CSSProperties = useMemo(
    () => ({
      height: tableStyles?.tableHeight || "300px",
      width: tableStyles?.tableWidth || "100%",
      overflow: "auto",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
      position: "relative",
    }),
    [tableStyles]
  );

  const initialState = useMemo(
    () => ({
      hiddenColumns: [""],
    }),
    []
  );

  // const defaultColumn = useMemo(() => {
  //   return {
  //     Filter: ColumnFilter,
  //   };
  // }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: memoizedColumns as ColumnGroup[],
      data,
      initialState,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  ) as any;

  const { globalFilter } = state;

  return (
    <div>
      <TableMenu
        width={tableStyles?.tableWidth || "100%"}
        allColumns={allColumns}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />

      <div style={tableContainerStyle} className="table-container">
        <table {...getTableProps()} className="content-table">
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<object>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: ColumnInstance<object>) => {
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
                        {/* <div>header setting</div> */}
                      </Flex>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
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
            {footerGroups.map((footerGroup: HeaderGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column: any) => (
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
