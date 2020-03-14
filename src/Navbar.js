import React from "react";
import { Router, Link, navigate } from "@reach/router";
import "./css/Navbar.module.css";

const Navbar = () => (
  <nav>
    <ul>
      <Link to="/">
        <li>
          <p>Home</p>
        </li>
      </Link>
      <Link to="/students">
        <li>
          <p>Students</p>
        </li>
      </Link>
      <Link to="/blocks">
        <li>
          <p>Blocks</p>
        </li>
      </Link>
    </ul>
  </nav>
);

export default Navbar;
