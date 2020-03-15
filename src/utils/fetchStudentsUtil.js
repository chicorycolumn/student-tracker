import axios from "axios";

const fetchStudentsData = cb => {
  axios
    .get("https://nc-student-tracker.herokuapp.com/api/students")
    .then(res => res.data)
    .then(students => {
      const studentsData = students["students"].slice(0, 5); // ***Remove this restriction later.

      studentsData.forEach(student => {
        axios
          .get(
            `https://nc-student-tracker.herokuapp.com/api/students/${student._id}`
          )
          .then(res => res.data)
          .then(studentByID => {
            const blockHistory = studentByID["student"]["blockHistory"];

            const currentBlockOfStudent = student["currentBlock"];

            student.iteration = blockHistory.filter(
              block => block.slug === currentBlockOfStudent
            ).length;

            // const fun_iterations = blockHistory.filter(
            //   block => block.slug === "fun"
            // ).length;

            // const be_iterations = blockHistory.filter(
            //   block => block.slug === "be"
            // ).length;

            // const fe_iterations = blockHistory.filter(
            //   block => block.slug === "fe"
            // ).length;

            // const proj_iterations = blockHistory.filter(
            //   block => block.slug === "proj"
            // ).length;

            // const historyStringArray = [];

            // if (fun_iterations > 0) {
            //   historyStringArray.push(`fun ${fun_iterations}`);
            // }
            // if (be_iterations > 0) {
            //   historyStringArray.push(`be ${be_iterations}`);
            // }
            // if (fe_iterations > 0) {
            //   historyStringArray.push(`fe ${fe_iterations}`);
            // }
            // if (proj_iterations > 0) {
            //   historyStringArray.push(`proj ${proj_iterations}`);
            // }

            // student.blockHistory = [fun_iterations, be_iterations, fe_iterations, proj_iterations];

            // console.log(studentsData);

            cb(studentsData);
          });
      });
    });
};

export default fetchStudentsData;
