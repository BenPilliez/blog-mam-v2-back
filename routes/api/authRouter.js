const router = require("express").Router();
const authController = require("../../controller/authController");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

module.exports = router;
