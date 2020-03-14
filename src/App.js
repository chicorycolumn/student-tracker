import React from "react";
import { Router, Link, navigate } from "@reach/router";
import "./css/App.module.css";
// import axios from "axios";
import Blocks from "./Blocks";
import Students from "./Students";
import Navbar from "./Navbar";

class App extends React.Component {
  render() {
    return (
      <div className="bogus">
        <Navbar />
        <Router>
          <Home path="/" />
          <About path="/about" />
          <Students path="/students/*" />
          <Blocks path="/blocks" />
        </Router>
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

export default App;
