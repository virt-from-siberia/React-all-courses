/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderProps, Renderer } from "react-table";

interface CellProps<T> {
  value: T;
}

export interface ColumnProps<T extends object> {
  Header: string | Renderer<HeaderProps<T>>;
  accessor?: any;
  CellComponent?: React.FC<CellProps<any>>;
  id?: string;
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
