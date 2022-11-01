const express = require("express");
const {users:ctrl}   = require("../../controllers");
const {auth,  ctrlWrapper, upload, validation } = require("../../middlewares");
const router = express.Router();
const { User,  joiSubscriptionSchema, joiVerifySchema } = require("../../models/user")


router.get("/current", auth,  ctrlWrapper(ctrl.getCurrent))

router.get("/verify/:verificationToken",  ctrlWrapper(ctrl.resendVerifyEmail))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar) )
router.post('/verify', validation(joiVerifySchema), ctrlWrapper(ctrl.resend))

router.patch("/:userId/subscription", auth,  async (req, res, next) => {
  try {
    const { error } = joiSubscriptionSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }

      const { userId } = req.params;
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
      );
      
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router