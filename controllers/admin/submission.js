const asyncHandler = require("../../middlewares/asyncHandler");
const { exec } = require("child_process");

function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

exports.submitFile = asyncHandler(async (req, res) => {

    

  //   For Compiling and Running the CPP File
  //   await execShellCommand("g++ ./processing/A.cpp");
  //   await execShellCommand("./a.out");
  return res.json({ message: "working" });
});
