import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styled from "styled-components";
import "./App.css";
import { useTable } from "react-table";
import fetchStudentsData from "./fetchStudentsUtil";
import fetchBlockData from "./fetchBlocksUtil";
import fetchStudentByIDUtil from "./fetchStudentByIDUtil";
import axios from "axios";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/students">
            <button>Students</button>
          </Link>
          <Link to="/blocks">
            <button>Blocks</button>
          </Link>
          <hr />
        </nav>
        <Router>
          <Home path="/" />
          <About path="/about" />
          <Students path="/students/*" />
          <Blocks path="/blocks" />
        </Router>
        ;
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

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
        <h2>Students</h2>
        <Router>
          <SingleStudent path="/:student_id" />
        </Router>
        <SuperStudentTable data={this.state.students} />
      </div>
    );
  }
}

class SingleStudent extends React.Component {
  state = { studentByID: "" };

  sneakyUpwardChange = studentByID => {
    this.setState({ studentByID });
  };

  // componentDidMount(event) {
  //   console.log(event);
  // }

  componentDidUpdate(prevProps, PrevState) {
    console.log(prevProps.student_id);
    console.log(this.props.student_id);
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

function SuperBlockTable(props) {
  let newData = props.data;

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
        }
        // ,
        // {
        //   Header: "Graduation Rate",
        //   accessor: "grad_rate"
        // }
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
                        //console.log(cell.value);
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

export default App;
