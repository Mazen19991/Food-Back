const router = require("express").Router();

router.route("/signup").post(require("../controllers/admins/signup"));
router.route("/signin").post(require("../controllers/admins/signin"));

module.exports = router;
