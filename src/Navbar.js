import React from "react";
import { Router, Link, navigate } from "@reach/router";
import styles from "./css/Navbar.module.css";
import placeholderPerson from "./placeholder-person.jpg";

const Navbar = () => (
  <>
    <div className={styles.aboveNav}>
      <Logo />
      <Searchbar />
      <LoggedInAs />
    </div>

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
  </>
);

const Logo = () => {
  return (
    <div className={styles.logo}>
      <p className={styles.logo_text}>NC</p>
      <p className={styles.logo_text}>Student</p>
      <p className={styles.logo_text}>Tracker</p>
    </div>
  );
};

class Searchbar extends React.Component {
  state = { searchInput: "" };
  render() {
    return (
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Szukaj studenta tutaj"
        />
      </div>
    );
  }
}

const LoggedInAs = props => {
  return (
    <div className={styles.loggedInAs}>
      {/* <p className={styles.adminPic}>PICTURE GOES HERE</p> */}
      <img
        className={styles.adminPic}
        // style={{ width: "20%" }}
        src={placeholderPerson}
        alt="Admin profile pic."
      />
      <p className={styles.loggedInWords}>You are logged in as</p>
      <p className={styles.loggedInName}>{props.adminName || "Admin-anon"}</p>
    </div>
  );
};

export default Navbar;
