const User = require("../../models/User")
const asyncHandler = require("../../middlewares/asyncHandler");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.getUserProfile = asyncHandler(async (req, res) => {
    const {user_id} = req.params;

    const user_doc = await User.findById(user_id);

    if(!user_doc) throw new ErrorResponse("No Such User Found", 404);

    return res.json({message: "User Found Successfully", data: user_doc})
})