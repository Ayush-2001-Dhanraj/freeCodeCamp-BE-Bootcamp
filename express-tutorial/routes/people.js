const express = require("express");
const {
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controller/people");

const router = express.Router();

// router.get("/", getPerson);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

router.route("/").get(getPerson).post(createPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
