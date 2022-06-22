const { sign, verify } = require("jsonwebtoken")

const database = require("./admin.service")
const schemas = require("../../configs/schemas")
const config = require("../../configs/configs")
const recaptcha = require('./functions/recaptcha')
const generateuuid = require('../students/functions/generateuuid')

module.exports = {

  user_login: async (req, res) => {
    const body = req.body
    const validate = schemas.login_schema.validate(req.body)
    const ip = req.connection.remoteAddress

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    if(body['g-recaptcha-response'] != config.recaptcha.bypass){
      const vrecaptcha = await recaptcha.verify(body['g-recaptcha-response'], ip, res)
      if(!vrecaptcha){
        return res.status(200).json({
          success: 0,
          message: 'recaptcha failed'
        })
      }
    }


    try {
      var results = await database.getuserbyusername(body);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    if (!results) {
      return await res.status(200).json({
        success: 0,
        message: "invalid username or password"
      });
    }

    if (body.password == results.password) {
      const jsontoken = sign({username: results.username, userkey: results.userkey }, config.jwt.encryptkey, {expiresIn: config.jwt.expire})
      return res.status(200).json({
        success: 1,
        message: jsontoken
      })
    }else {
      return res.status(200).json({
        success: 0,
        message: "invalid username or password"
      });
    }


  },
  user_verify: async (req, res) => {
    const queries = req.query;

    if (!queries.token){
      return res.status(200).json({
        success: 0,
        message: `No token provided`
      })
    }

    const token = queries.token;

    try {
      var decoded = verify(token, config.jwt.encryptkey);
    } catch(err) {
      return res.status(200).json({
        success: 0,
        message: err
      })
    }
    
    try {
      var results = await database.getuserbykey(decoded.userkey);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    if (!results) {
      return await res.status(200).json({
        success: 0,
        message: "invalid user"
      });
    }

    return await res.status(200).json({
      success: 1,
      message: results
    });
  },
  commands: async (req, res) => {
    const body = req.body
    const validate = schemas.commands_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.updatecommand(body.type, body.action);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `action saved for ${body.type}`
    })
  },
  specializations_view: async (req, res) => {
    try {
      var results = await database.getspecializations();
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: results
    })
  },
  specializations_add: async (req, res) => {
    const body = req.body
    const validate = schemas.specializations_add_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.insertspecialization(body.specialization);
    }catch (err) {

      if(err.code == 'ER_DUP_ENTRY'){
        return res.status(200).json({
          success: 0,
          message: `Specialization ${body.specialization} already exists`
        })
      }

      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Added specialization: ${body.specialization}`
    })
  },
  specializations_delete: async (req, res) => {
    const body = req.body
    const validate = schemas.specializations_delete_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.deletespecialization(body.specialization);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Deleted specialization: ${body.specialization}`
    })
  },
  students_view: async (req, res) => {
    try {
      var results = await database.getstudents();
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }
    
    return res.status(200).json({
      success: 1,
      message: results
    })
  },
  students_delete: async (req, res) => {
    const body = req.body
    const validate = schemas.students_delete_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.deletestudent(body.student_uuid);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Deleted student: ${body.student_uuid}`
    })
  },
  students_reset: async (req, res) => {
    const body = req.body
    const validate = schemas.students_reset_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.updatestudent(body.student_uuid, body.type);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `${body.type} exam has been reseted for student: ${body.student_uuid}`
    })
  },
  students_time: async (req, res) => {
    const body = req.body
    const validate = schemas.running_addtime_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.updatestudentstime(body.student_uuid, body.time, body.type);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Added ${body.time} seconds to ${body.type} exam of student: ${body.student_uuid}`
    })
  },
  exams_view: async (req, res) => {
    try {
      var results = await database.getexams();
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: results
    })
  },
  exams_add: async (req, res) => {
    const body = req.body
    const validate = schemas.exams_add_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    const uuid = generateuuid.generate(body.type);

    try {
      await database.insertexam(body.name, uuid, body.time, body.specialization, body.type);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Added exam: ${body.name}`
    })
  },
  exams_delete: async (req, res) => {
    const body = req.body
    const validate = schemas.exams_delete_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.deleteexam(body.uuid);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Deleted exam: ${body.uuid}`
    })
  },
  exams_time: async (req, res) => {
    const body = req.body
    const validate = schemas.exams_time_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      await database.updateexamtime(body.uuid, body.time);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    return res.status(200).json({
      success: 1,
      message: `Changed exam ${body.uuid} time to: ${body.time} seconds`
    })
  },
  exams_questions_add: async (req, res) => {
    const body = req.body
    const validate = schemas.exams_questions_add_schema.validate(req.body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      var exam_questions = await database.getexamquestions(body.uuid);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    if(!exam_questions){
      return res.status(200).json({
        success: 0,
        message: `Couldn't find any exams witht this uuid`
      })
    }

    exam_questions = JSON.parse(exam_questions.questions)
    
    for(added_question of body.questions){
      exam_questions.push(added_question)
    }

    const size = body.questions.length

    exam_questions = JSON.stringify(exam_questions);
    
    try {
      await database.updateexamquestions(body.uuid, exam_questions, size);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }


    return res.status(200).json({
      success: 1,
      message: `Questions added successfully`
    })
  },
  exams_questions_delete: async (req, res) => {
    const body = req.body
    const validate = schemas.exams_questions_delete_schema.validate(req.body)
    var new_questions = [];

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    try {
      var exam_questions = await database.getexamquestions(body.uuid);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    if(!exam_questions){
      return res.status(200).json({
        success: 0,
        message: `Couldn't find any exams witht this uuid`
      })
    }

    exam_questions = JSON.parse(exam_questions.questions)

    for(question of exam_questions){
      if(question.id != body.id){
        new_questions.push(question)
      }
    }

    const size = 0

    new_questions = JSON.stringify(new_questions);

    try {
      await database.updateexamquestions(body.uuid, new_questions, size);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }


    return res.status(200).json({
      success: 1,
      message: `Question ${body.id} was removed`
    })
  }
}