const { sign } = require("jsonwebtoken")
const jwt = require('jsonwebtoken');
const database = require("./students.service")
const schemas = require("../../configs/schemas")
const generateuuid = require('./functions/generateuuid');
const configs = require("../../configs/configs");

module.exports = {
  register: async (req, res) => {
    var body = req.body

    const validate = schemas.register_student_schema.validate(body)

    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    var student_uuid = generateuuid.generate('student')

    try {
      await database.createstudent(body, student_uuid);
      return res.status(200).json({
        success: 1,
        message: student_uuid
      })
    }catch (err) {
      if (err.code == 'ER_DUP_ENTRY'){
        return res.status(200).json({
          success: 0,
          message: 'Account with this email or id already exist'
        })
      }
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }
  },
  specializations: async (req, res) => {
    try {
      return res.status(200).json({
        success: 1,
        message: await database.getspecializations()
      })
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }
  },
  exams: async (req, res) => {
    var body = req.body

    const validate = schemas.exam_student_schema.validate(body)

    // validate input
    if (validate.error){
      return res.status(200).json({
        success: 0,
        message: validate.error.details[0].message
      })
    }

    // get student
    try {
      var student = await database.getstudentbystudentuuid(body.student_uuid);
    }catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    // check if existing user
    if (!student){
      return res.status(200).json({ 
        success: 0,
        message: `invalid student id`
      })
    }

    // start exam
    if (body.action == 'start'){
      // check if allowed user
      if ((student.mcq_taken == 'yes' && body.type == 'mcq') || (student.written_taken == 'yes' && body.type == 'written')){
        return res.status(200).json({ 
          success: 0,
          message: `You have already taken the ${body.type} exam`
        })
      }

      try {
        var command = await database.getcommands(body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }


      //check if allowed exam

      if (!command?.action){
        return res.status(200).json({ 
          success: 0,
          message: `please specify exam type`
        })
      }
      if (command?.action != 'yes'){
        return res.status(200).json({ 
          success: 0,
          message: `${body.type} exams are not allowed yet`
        })
      }





      //check if already started
      if (student[body.type+'_start']){
        return res.status(200).json({ 
          success: 1,
          message: `start`
        })
      }
      
      //get all exams with the same specialization
      try {
        var exams = await database.getexamsbyspecialization(student.specialization, body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }

      //check if no exams
      if(!exams || exams.length == 0){
        return res.status(200).json({ 
          success: 0,
          message: `no exams found for the selected specialization`
        })
      }

      //randomize exam
      var selected_exam = exams[Math.floor(Math.random()*exams.length)]

      //assign user the exam uuids
      try {
        await database.updateuserexamuuid(student.student_uuid, selected_exam.uuid, body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }

      const exam_time = selected_exam.time; //exam time in seconds
      const start = Math.floor(Date.now() / 1000); //timestamp in seconds
      const end = start + exam_time; //exam end time

      //start exam
      try {
        await database.startuserexam(start, end, student.student_uuid, body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }

      return res.status(200).json({ 
        success: 1,
        message: `start`
      })
    }

    // check if there are running exams

    if (student[body.type+'_taken'] == 'yes' || !student[body.type+'_start'] || !student[body.type+'_end']){
      return res.status(200).json({ 
        success: 0,
        message: `You do not have any running ${body.type} exams`
      })
    }

    //get exam
    try {
      var exam = await database.getexambyuuid(student[body.type+'_uuid'])
    } catch (err) {
      return res.status(200).json({
        success: 0,
        message: `Failed, Please email technical support: ${err}`
      })
    }

    // end exam
    if (body.action == 'end'){
      const timestamp = Math.floor(Date.now() / 1000); //timestamp in seconds
      
      if(body.type == 'written'){
        var grade = null
      }

      if(body.type == 'mcq'){
        var grade = 0
        const answers = JSON.parse(student.mcq_answers);
        const model_questions = JSON.parse(exam.questions);
        
        for (const answer of answers){
          for (const model_question of model_questions){
            if(answer.id == model_question.id){
              if(answer.answer == model_question.correct){
                grade += parseInt(model_question.marks)
              }
              break
            }
          }
        }

      }

      // end exam
      try {
        var student = await database.enduserexam(grade, timestamp, student.student_uuid, body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }

      console.log('ended');
      if (body.type == 'written'){
        return res.status(200).json({
          success: 1,
          message: `Exam ended, Your grade is to be calculated`
        })
      }

      return res.status(200).json({
        success: 1,
        message: `Exam ended, Your grade is ${grade}`
      })

    }

    // begin exam
    if (body.action == 'begin'){
      const questions = JSON.parse(exam.questions);
      const student_answers = JSON.parse(student[body.type+'_answers']);
      const timestamp = Math.floor(Date.now() / 1000);

      const fixed_questions = [];

      for (const question of questions) {

        for (const answer of student_answers){
          if (answer.id == question.id){
            question.answered = answer.answer;
            break;
          };
        }

        delete question?.correct;

        fixed_questions.push(question);
      }

      const scheme = {
        exam_time: exam.time,
        current_time: timestamp,
        exam_end: student[body.type+'_end'],
        type: body.type,
        questions: fixed_questions
      }

      return res.status(200).json({
        success: 1,
        message: scheme
      })
      // send first question
      
    }

    const timestamp = Math.floor(Date.now() / 1000);
    if (student[body.type+'_end'] < timestamp){ // change to < after test
      return res.status(200).json({ 
        success: 0,
        message: `exam time passed, you can no longer edit your answers`
      })
    }


    if (body.action == 'submit'){
      const submitted_id = body?.question_id;
      const submitted_answer = body?.answer;
      const saved_answers = JSON.parse(student[body.type+'_answers']);
      const updated_answers = [];

      //verify schema
      if (!submitted_id){
        return res.status(200).json({ 
          success: 0,
          message: `please specify question id`
        })
      }

      if (!submitted_answer){
        return res.status(200).json({ 
          success: 0,
          message: `please specify answer`
        })
      }

      //check valid id
      const exam_questions = JSON.parse(exam.questions);
      for(const exam_question of exam_questions){
        if(exam_question.id == submitted_id){
          var allowed_id = true;
        }
      }
      if (!allowed_id){
        return res.status(200).json({ 
          success: 0,
          message: `not allowed question id`
        })
      }

      // check if already answerd
      for (const saved_answer of saved_answers) {
        if (saved_answer.id == submitted_id){
          updated_answers.push({id: submitted_id, answer: submitted_answer});
          var found_dup = true;
        }else{
          updated_answers.push(saved_answer);
        }
      }
      if (!found_dup){
        updated_answers.push({id: submitted_id, answer: submitted_answer});
      }

      // update answers
      try {
        var student = await database.updateuserexamanswer(student.student_uuid, JSON.stringify(updated_answers), body.type);
      }catch (err) {
        return res.status(200).json({
          success: 0,
          message: `Failed, Please email technical support: ${err}`
        })
      }


      return res.status(200).json({
        success: 1,
        message: `answer submitted`
      })

    }
  }
}