const router = require("express").Router();
const rateController = require("../../controller/rateController");

router.get("/:id", rateController.get_rate_post);
router.post("/:id", rateController.post_rate);

module.exports = router;
