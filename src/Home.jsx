import React from "react";
import purpleBackground from "./purple-wallpaper.jpg";
import styles from "./css/Home.module.css";

const Home = () => (
  <body
    className={styles.main}
    //style={{ backgroundImage: `url(${purpleBackground})` }}
  >
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
      return (
        <div
          className={styles[num % 2 ? "cellA" : "cellB"]}
          id={styles[`cell${num}`]}
        ></div>
      );
    })}
    <h2 className={styles.title}>H O M E</h2>
  </body>
);

export default Home;
