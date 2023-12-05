import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    maxWidth: 150,
    minWidth: 150,
    width: 150,
    disableFilters: true,
    sticky: "right",
    className: "frozen",
    headerClassName: "frozen",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    // maxWidth: 350,
    // minWidth: 350,
    // width: 350,
    sticky: "right",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    // maxWidth: 250,
    // minWidth: 250,
    // width: 250,
    sticky: "left",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
    // maxWidth: 50,
    // minWidth: 50,
    // width: 50,
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
    // maxWidth: 50,
    // minWidth: 50,
    // width: 50,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
    // maxWidth: 50,
    // minWidth: 50,
    // width: 50,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
    // Cell: ({ value }) => {
    //   return (
    //     <div
    //       style={{
    //         minWidth: "300px",
    //         width: "100%",
    //         // height: "100px",
    //         border: "1px solid black",
    //       }}
    //     >
    //       {value}
    //     </div>
    //   );
    // },
  },
];

export const GROUP_COLUMNS = [
  {
    Header: "id",
    Footer: "id Name",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];