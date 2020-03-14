import axios from "axios";

const fetchBlocksData = cb => {
  Promise.all([
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students?block=fun")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students?block=be")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students?block=fe")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students?block=proj")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students?block=grad")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/blocks")
      .then(res => res.data),
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students")
      .then(res => res.data)
  ]).then(resArr => {
    const totalBlocks = {
      fun: resArr[0]["students"],
      be: resArr[1]["students"],
      fe: resArr[2]["students"],
      proj: resArr[3]["students"],
      grad: resArr[4]["students"]
    };
    const blocks = resArr[5].blocks;
    const students = resArr[6].students; //Delete this slice, nephew.

    const retakeRates = {};
    const passFirstTimeRates = {};

    blocks.forEach(block => {
      retakeRates[block["number"]] = 0;
      passFirstTimeRates[block["number"]] = 0;
      block.studentTotal = totalBlocks[block["slug"]].length;
    });

    students.forEach(student => {
      axios
        .get(
          `https://nc-student-tracker.herokuapp.com/api/students/${student._id}`
        )
        .then(res => res.data)
        .then(studentByID => {
          const blockHistory = studentByID["student"]["blockHistory"];

          console.log(blockHistory);

          const historyTally = {};

          blocks.forEach(block => {
            historyTally[block["number"]] = 0;
          });

          blockHistory.forEach(historyUnit => {
            historyTally[historyUnit["number"]]++;
          });

          for (let i = 1; i < 5; i++) {
            if (historyTally[i] === 1 && historyTally[i + 1] > 0) {
              passFirstTimeRates[i]++;
            }
            if (historyTally[i] > 1) {
              retakeRates[i] += historyTally[i] - 1;
            }
          }

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
        })
        .then(() => {
          blocks.forEach(block => {
            block.retakeRate = (
              (retakeRates[block["number"]] /
                (retakeRates[block["number"]] +
                  passFirstTimeRates[block["number"]])) *
              100
            ).toFixed(1);
          });

          cb(blocks);
        });
    });
  });
};
export default fetchBlocksData;
