const router = require("express").Router();
const {
  Create,
  GetAll,
  GetASingle,
  Update,
  Delete,
} = require("../controller/goalController");
const auth = require("../middleware/auth");

router.route("/goals").post(auth, Create).get(GetAll);
router
  .route("/goals/:goalId")
  .get(GetASingle)
  .patch(auth, Update)
  .delete(auth, Delete);

module.exports = router;
