const router = require("express").Router();
const {
  getAllStudents,
  updateUser,
} = require("../controller/studentController");

router.get("/students", getAllStudents);
router.put("/updateUser/:id", updateUser);

module.exports = router;
