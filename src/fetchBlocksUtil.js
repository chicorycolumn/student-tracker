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

    blocks.forEach(block => {
      block.studentTotal = totalBlocks[block["slug"]].length;
    });
    console.log(blocks);
    cb(blocks);
  });
};
export default fetchBlocksData;
