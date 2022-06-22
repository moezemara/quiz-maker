const controller = require("./admin.controller")
const router = require("express").Router()

router.post("/user/login", controller.user_login)
router.get("/user/verify", controller.user_verify)

router.post("/commands", controller.commands)

router.get("/specializations/view", controller.specializations_view)
router.post("/specializations/add", controller.specializations_add)
router.post("/specializations/delete", controller.specializations_delete)

router.get("/students/view", controller.students_view)
router.post("/students/delete", controller.students_delete)
router.post("/students/reset", controller.students_reset)
router.post("/students/time", controller.students_time)

router.get("/exams/view", controller.exams_view) //done
router.post("/exams/add", controller.exams_add) //done
router.post("/exams/delete", controller.exams_delete) //done
router.post("/exams/time", controller.exams_time)//done
router.post("/exams/questions/add", controller.exams_questions_add)//done
router.post("/exams/questions/delete", controller.exams_questions_delete)//done

module.exports = router;
