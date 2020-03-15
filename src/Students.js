import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styled from "styled-components";
import styles from "./css/Students.module.css";
import { useTable } from "react-table";
import fetchStudentsData from "./utils/fetchStudentsUtil";
import fetchStudentByIDUtil from "./utils/fetchStudentByIDUtil";

class Students extends React.Component {
  state = {
    students: "loading...",
    isLoading: true
  };

  sneakyUpwardChange = students => {
    this.setState({ students });
  };

  componentDidMount() {
    fetchStudentsData(this.sneakyUpwardChange);
  }

  render() {
    return (
      <div>
        <h2 className={styles.title}>S T U D E N T S</h2>
        <Router>
          <SingleStudent path="/:student_id" />
        </Router>
        <SuperStudentTable data={this.state.students} />
      </div>
    );
  }
}

function SuperStudentTable(props) {
  let newData = props.data;

  const columns = [
    {
      Header: "Students",
      columns: [
        {
          Header: "Student ID",
          accessor: "_id"
        },
        {
          Header: "Student Name",
          accessor: "name"
        },
        {
          Header: "Starting Cohort",
          accessor: "startingCohort"
        },
        {
          Header: "Current Block",
          accessor: "currentBlock"
        },
        {
          Header: "Iteration of current block",
          accessor: "iteration"
        }
      ]
    }
  ];
  if (Array.isArray(newData)) {
    return (
      <Styles>
        <TableStudents columns={columns} data={newData} />
      </Styles>
    );
  } else {
    return <p>loading...</p>;
  }
}

function TableStudents({ columns, data }) {
  function handleClick(student_id) {
    navigate(`/students/${student_id}`);
  }

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
                return (
                  <td
                    onClick={e => {
                      if (cell.column.Header === "Student ID") {
                        handleClick(cell.value);
                      }
                    }}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

class SingleStudent extends React.Component {
  state = { studentByID: "" };

  sneakyUpwardChange = studentByID => {
    this.setState({ studentByID });
  };

  componentDidMount() {
    fetchStudentByIDUtil(this.sneakyUpwardChange, this.props.student_id);
  }

  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.student_id !== this.props.student_id) {
      fetchStudentByIDUtil(this.sneakyUpwardChange, this.props.student_id);
    }
  }

  render() {
    return (
      <div>
        <p>
          {this.state.studentByID
            ? this.state.studentByID["student"]["name"]
            : "loading..."}
        </p>
        <ul>
          {this.state.studentByID
            ? `This student is called ${this.state.studentByID.student.name} and their starting cohort is ${this.state.studentByID.student.startingCohort}`
            : "loading..."}
        </ul>
      </div>
    );
  }
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

export default Students;
