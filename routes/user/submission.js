const express = require("express");
const {
  checkAuthorizationHeaders,
  authenticateUser,
} = require("../../middlewares/authenticate");
const {
  validateRequestBody,
  checkMongoId,
} = require("../../middlewares/validateRequestBody");
const { submitFile, checkSubmitRequest } = require("../../controllers/user/submission");
const upload = require("../../config/multerUpload");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateUser,

    upload.fields([{name: "submission_file", maxCount: 1}]),

    checkSubmitRequest,
    validateRequestBody,

    submitFile
  );

module.exports = router;
