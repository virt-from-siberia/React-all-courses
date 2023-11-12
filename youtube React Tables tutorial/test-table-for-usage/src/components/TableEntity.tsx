/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";

import { BasicTable } from "./Table/BasicTable";

import MOCK_DATA from "./Table/data/MOCK_DATA.json";
// import { COLUMNS } from "./Table/data/columns";

export const TableEntity = () => {
  // const columns = useMemo(() => COLUMNS, [COLUMNS]);

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
      CellComponent: (props: any) => {
        const { value } = props;
        const formattedDate = new Date(value).toLocaleDateString();
        return <div onClick={() => alert("cklicked")}>{formattedDate}</div>;
      },
    },
    {
      title: "Age",
      accessor: "age", // ключ из данных для доступа к значению
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
