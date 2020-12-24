const router = require("express").Router();
const usersController = require("../../controller/usersController");
const {checkRoleAndOwner} = require("../../helpers/authHelper");

router.get("/:id", checkRoleAndOwner, usersController.get_details);
router.put("/:id", checkRoleAndOwner, usersController.update_user);
router.put("/password/:id", checkRoleAndOwner, usersController.update_user_password);
router.delete("/", checkRoleAndOwner, usersController.delete_user);

module.exports = router;
