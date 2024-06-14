const express = require("express");
const {
  checkAuthorizationHeaders,
  authenticateUser,
} = require("../../middlewares/authenticate");
const {
  validateRequestBody,
  checkMongoId,
} = require("../../middlewares/validateRequestBody");
const { getUserProfile } = require("../../controllers/user/profile");

const router = express.Router({ mergeParams: true });

router.route("/id/:user_id").get(
  checkAuthorizationHeaders,
  validateRequestBody,
  authenticateUser,
  checkMongoId("user_id"),
  validateRequestBody,

  getUserProfile
);

// router.route("/all").get(
//   checkAuthorizationHeaders,
//   validateRequestBody,
//   authenticateAdmin,

//   getAllAdmins
// );

// router.route("/handle").patch(
//   checkAuthorizationHeaders,
//   validateRequestBody,
//   authenticateAdmin,
//   checkChangeHandleRequest,
//   validateRequestBody,

//   changeHandle
// );

module.exports = router;
