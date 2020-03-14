import React from "react";
import styled from "styled-components";
import "./css/App.module.css";
import { useTable } from "react-table";
import fetchBlockData from "./utils/fetchBlocksUtil";

class Blocks extends React.Component {
  state = {
    blocks: "loading...",
    isLoading: true
  };

  sneakyUpwardChange = blocks => {
    this.setState({ blocks });
  };

  componentDidMount() {
    fetchBlockData(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <h2>Blocks</h2>
        <SuperBlockTable data={this.state.blocks} />
      </div>
    );
  }
}

function SuperBlockTable(props) {
  let data = [...props.data];
  let newData = [];
  data.forEach(obj => newData.push({ ...obj }));
  newData.forEach(obj => {
    if (obj["slug"] === "grad") {
      obj.retakeRate = "";
    }
  });

  newData.unshift({
    _id: "tot",
    number: 0,
    name: "Total",
    slug: "tot",
    __v: 0,
    studentTotal: newData.reduce((acc, obj) => {
      return (acc += obj.studentTotal);
    }, 0),
    retakeRate:
      newData.slice(0, -1).reduce((acc, obj) => {
        return (acc += parseInt(obj.retakeRate));
      }, 0) / newData.length
  });

  const columns = [
    {
      Header: "Blocks",
      columns: [
        {
          Header: "Block Name",
          accessor: "name"
        },

        {
          Header: "Number of Students",
          accessor: "studentTotal"
        },
        {
          Header: "Retake (%)",
          accessor: "retakeRate"
        }
      ]
    }
  ];
  if (Array.isArray(newData)) {
    return (
      <Styles>
        <Table columns={columns} data={newData} />
      </Styles>
    );
  } else {
    return <p>loading...</p>;
  }
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default Blocks;
