/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { CellProps } from "react-table";

import { BasicTable } from "./Table/BasicTable";
import MOCK_DATA from "./Table/data/MOCK_DATA.json";

interface RowData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: string;
}

export const TableEntity = () => {
  const columns = [
    {
      title: "ID",
      accessor: "id",
      maxWidth: 30,
      minWidth: 30,
      width: 30,
      disableFilters: true,
      className: "header-class",
      headerClassName: "header-class",
    },
    {
      title: "Full Name",
      accessor: "full_name",
      CellComponent: ({ row }: CellProps<RowData, string>) => {
        return (
          <span>{`${row.original.first_name} ${row.original.last_name}`}</span>
        );
      },
    },
    {
      title: "First Name",
      accessor: "first_name",
      maxWidth: 200,
      minWidth: 150,
      width: 200,
    },
    {
      title: "Last Name",
      accessor: "last_name",
      maxWidth: 200,
      minWidth: 150,
      width: 200,
    },
    {
      title: "Email",
      accessor: "email",
    },
    {
      title: "Date of Birth",
      accessor: "date_of_birth",
      CellComponent: (props: CellProps<RowData, string>) => {
        const { value } = props;
        const formattedDate = new Date(value).toLocaleDateString();
        return <div onClick={() => alert("cklicked")}>{formattedDate}</div>;
      },
    },
    {
      title: "Age",
      accessor: "age",
      maxWidth: 100,
      minWidth: 50,
      width: 100,
    },
    {
      title: "Country",
      accessor: "country",
    },
    {
      title: "Phone",
      accessor: "phone",
    },
  ];

  const data = useMemo(() => MOCK_DATA, [MOCK_DATA]);

  return (
    <>
      <BasicTable data={data} columns={columns} />
    </>
  );
};
