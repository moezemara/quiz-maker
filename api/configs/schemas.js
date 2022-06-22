const joi = require('joi');
const config = require('./configs')

const login_schema = joi.object({
  username: joi.required(),
  password: joi.required(),
  'g-recaptcha-response': joi.string().required()
})

const create_exam_schema = joi.object({
  questions: joi.required(),
  type: joi.required(),
  specialization: joi.required()
})

const search_exam_schema = joi.object({
  uuid: joi.required()
})

const delete_exam_schema = joi.object({
  uuid: joi.required()
})

const register_student_schema = joi.object({
  name: joi.string().required(),
  emirates_id: joi.string().pattern(new RegExp(/^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/)).required().messages({'string.pattern.base': 'Invalid emirates id'}),
  phone: joi.number().required(),
  email: joi.string().email({tlds: {allow: false}}).required(),
  specialization: joi.required()
})

const exam_student_schema = joi.object({
  student_uuid: joi.required(),
  action: joi.required().valid('start', 'end', 'begin', 'submit'),
  question_id: joi.number().min(1).max(1000).optional(),
  answer: joi.optional(),
  type: joi.optional().valid('mcq', 'written')
})

const commands_schema = joi.object({
  type: joi.required().valid('mcq', 'written'),
  action: joi.required().valid('yes', 'no')
})

const specializations_add_schema = joi.object({
  specialization: joi.required()
})

const specializations_delete_schema = joi.object({
  specialization: joi.required()
})

const students_delete_schema = joi.object({
  student_uuid: joi.required()
})

const students_reset_schema = joi.object({
  student_uuid: joi.required(),
  type: joi.required().valid('mcq', 'written')
})

const running_addtime_schema = joi.object({
  student_uuid: joi.required(),
  time: joi.number().required(),
  type: joi.required().valid('mcq', 'written')
})

const exams_add_schema = joi.object({
  name: joi.required(),
  time: joi.number().required(),
  specialization: joi.required(),
  type: joi.required().valid('mcq', 'written')
})

const exams_delete_schema = joi.object({
  uuid: joi.required()
})

const exams_time_schema = joi.object({
  uuid: joi.required(),
  time: joi.number().required()
})

const exams_questions_add_schema = joi.object({
  uuid: joi.required(),
  questions: joi.required()
})

const exams_questions_delete_schema = joi.object({
  uuid: joi.required(),
  id: joi.required()
})

module.exports= {
  login_schema, create_exam_schema, search_exam_schema, delete_exam_schema, register_student_schema, exam_student_schema, commands_schema, 
  specializations_add_schema, specializations_delete_schema, students_delete_schema, students_reset_schema, running_addtime_schema, exams_add_schema,
  exams_delete_schema, exams_time_schema, exams_questions_add_schema, exams_questions_delete_schema
}
