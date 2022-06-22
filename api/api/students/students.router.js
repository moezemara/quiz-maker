const controller = require("./students.controller")
const router = require("express").Router()

router.post("/register", controller.register)
router.post("/exams", controller.exams)
router.get("/specializations", controller.specializations)


module.exports = router;
