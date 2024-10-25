import React from "react";
import DataTable from "react-data-table-component";

const demoColumns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

const demoData = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

export default function ReactDataTableComponent({ columns, data }) {
  return (
    <DataTable
      columns={demoColumns}
      data={demoData}
      responsive
      pagination
      paginationRowsPerPageOptions={[10, 25, 50]}
    />
  );
}
