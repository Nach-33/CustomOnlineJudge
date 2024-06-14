const { body } = require("express-validator");
const ErrorResponse = require("../../utils/ErrorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");
const { fileUpload } = require("../../config/firebaseConfig");
const Question = require("../../models/Question");
const Admin = require("../../models/Admin");

exports.checkAddQuestionRequest = [
  body("title")
    .exists()
    .withMessage("Question Title is Required")
    .bail()
    .custom(async (value, { req }) => {
      const title_exists = await Question.findOne({ title: value });
      if (title_exists)
        throw new ErrorResponse("Question With Title Already Exists");
      return true;
    }),
  body("content").exists().withMessage("Question Content is Required").bail(),
  body().custom((value, { req }) => {
    if (!req.files?.solution_file?.length) {
      throw new ErrorResponse("Solution File is Required");
    }
    return true;
  }),
];

exports.addQuestion = asyncHandler(async (req, res) => {
  const admin_id = req.auth_user.static_id;
  const { title, content } = req.body;
  const solution_file = req.files.solution_file[0];

  const file_title = title.split(" ").join("_") + Date.now() + ".txt";
  const file_url = fileUpload(solution_file, file_title);

  const question = await Question.create({
    title: title,
    content: content,
    solution_file: file_url,
  });

  await Admin.findOneAndUpdate(
    {
      _id: admin_id,
    },
    {
      $push: {
        questions_created: { question_id: question._id },
      },
    }
  );

  return res.json({ message: "Question Added Successfully" });
});
