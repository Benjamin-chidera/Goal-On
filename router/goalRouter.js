const router = require("express").Router();
const {
  Create,
  GetAll,
  GetASingle,
  Update,
  Delete,
} = require("../controller/goalController");

router.route("/goals").post(Create).get(GetAll);
router.route("/goals/:goalId").get(GetASingle).patch(Update).delete(Delete);

module.exports = router;
