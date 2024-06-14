const express = require("express");
const {
  checkAuthorizationHeaders,
  authenticateAdmin,
} = require("../../middlewares/authenticate");
const {
  validateRequestBody,
  checkMongoId,
} = require("../../middlewares/validateRequestBody");
const { submitFile } = require("../../controllers/admin/submission");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    checkAuthorizationHeaders,
    validateRequestBody,
    authenticateAdmin,
    submitFile
  );

module.exports = router;
