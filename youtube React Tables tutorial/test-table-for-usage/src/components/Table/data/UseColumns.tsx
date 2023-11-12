/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentClass, ReactNode } from "react";
import { HeaderProps, Renderer } from "react-table";

interface CellProps<T> {
  value: T;
}

export interface ColumnProps {
  title: string;
  accessor: string;
  CellComponent?: React.FC<CellProps<any>>;
  maxWidth?: number;
  minWidth?: number;
  width?: string | number;
  disableFilters?: boolean;
  sticky?: string;
  className?: string;
  headerClassName?: string;
  getSortByToggleProps?: (props?: unknown) => unknown;
  isSorted?: boolean;
  isSortedDesc?: boolean;
}

export function useColumns(columnPropsArray: ColumnProps[]) {
  return React.useMemo(() => {
    return columnPropsArray.map((columnProps) => {
      const {
        accessor,
        CellComponent,
        maxWidth,
        minWidth,
        width,
        disableFilters,
        sticky,
        className,
        headerClassName,
        getSortByToggleProps,
        isSorted,
        isSortedDesc,
        title,
      } = columnProps;

      const column = {
        Header: title,
        id: accessor,
        ...(typeof accessor !== "undefined" ? { accessor } : {}),
        ...(CellComponent && {
          Cell: (props: any) => <CellComponent {...props} />,
        }),
        ...(maxWidth && { maxWidth }),
        ...(minWidth && { minWidth }),
        ...(width && { width }),
        ...(disableFilters && { disableFilters }),
        ...(sticky && { sticky }),
        ...(className && { className }),
        ...(headerClassName && { headerClassName }),
        ...(getSortByToggleProps && { getSortByToggleProps }),
        ...(isSorted && { isSorted }),
        ...(isSortedDesc && { isSortedDesc }),
      };

      return column;
    });
  }, [columnPropsArray]);
}
