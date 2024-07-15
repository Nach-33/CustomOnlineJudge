const { body } = require("express-validator");
const asyncHandler = require("../../middlewares/asyncHandler");
const { exec } = require("child_process");
const ErrorResponse = require("../../utils/ErrorResponse");
const fs = require("fs");

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

exports.checkSubmitRequest = [
  body().custom((value, { req }) => {
    if (!req.files?.submission_file?.length) {
      throw new ErrorResponse("Submission File is Required");
    }
    return true;
  }),
];

const uploadSub = (file) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile("./processing/sub.cpp", file.buffer, function (err) {
      if (err) {
        return reject();
      }
      return resolve();
    });
  });
};

exports.submitFile = asyncHandler(async (req, res) => {
  const submission_file = req.files.submission_file[0];
  try {
    await uploadSub(submission_file);
    await execShellCommand("g++ ./processing/sub.cpp");
    let exec_time = await execShellCommand("time timeout 2s ./a.out");
    exec_time = Number(((exec_time.split("system 0:0"))[1].split("e"))[0]);

    await fs.promises.unlink("./processing/sub.cpp", (err) => {
      if(err){
        console.log(err.message);
        return res.status(500).json({message: err.message})
      }
    });
    
    return res.json({ message: "working" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});
