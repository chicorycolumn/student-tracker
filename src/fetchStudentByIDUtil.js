import React from "react";
import axios from "axios";

const fetchStudentByID = (cb, student_id) => {
  axios
    .get(`https://nc-student-tracker.herokuapp.com/api/students/${student_id}`)
    .then(res => res.data)
    .then(studentByID => {
      cb(studentByID);
    });
};

export default fetchStudentByID;
