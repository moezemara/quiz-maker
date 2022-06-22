const pool = require("../../configs/database");

module.exports = {
  createstudent: (body, student_uuid) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `insert into students (name, email, phone, emirates_id, specialization, student_uuid, mcq_answers, written_answers)
                  values(?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.name,
          body.email,
          body.phone,
          body.emirates_id,
          body.specialization,
          student_uuid,
          '[]',
          '[]'
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      )
    })

  },
  updateuserexamuuid: (student_uuid, exam_uuid, exam_type) => {
    const type_uuid = `${exam_type}_uuid`
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = ? WHERE student_uuid = ?`,
        [
          type_uuid,
          exam_uuid,
          student_uuid
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      )
    })
  },
  updateuserexamanswer: (student_uuid, exam_answers, exam_type) => {
    const type_answers = `${exam_type}_answers`
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = ? WHERE student_uuid = ?`,
        [
          type_answers,
          exam_answers,
          student_uuid
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      )
    })
  },
  startuserexam: (start, end, student_uuid, exam_type) => {
    const type_start = `${exam_type}_start`
    const type_end = `${exam_type}_end`
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = ? , ?? = ? WHERE student_uuid = ?`,
        [
          type_start,
          start,
          type_end,
          end,
          student_uuid
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      )
    })
  },
  enduserexam: (grade, end, student_uuid, exam_type) => {
    const type_taken = `${exam_type}_taken`
    const type_grade = `${exam_type}_grade`
    const type_end = `${exam_type}_end`

    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = 'yes' ,  ?? = ? , ?? = ? WHERE student_uuid = ?`,
        [
          type_taken,
          type_grade,
          grade,
          type_end,
          end,
          student_uuid
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      )
    })
  },
  getcommands: (type) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from commands where command = ?`,
        [type],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results[0])
          }
        }
      );
    })
  },
  getspecializations: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT specialization from specializations`,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      );
    })
  },
  getexambyuuid: (uuid) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `select * from exams where uuid = ?`,
        [uuid],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results[0])
          }
        }
      );
    })
  },
  getexamsbyspecialization: (specialization, type) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `select * from exams where specialization = ? AND type = ?`,
        [specialization, type],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      );
    })
  },
  deleteexambyuuid: (uuid) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `DELETE FROM exams WHERE uuid = ?`,
        [uuid],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      );
    })
  },
  getstudentbystudentuuid: (student_uuid) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from students where student_uuid = ?`,
        [student_uuid],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results[0])
          }
        }
      );
    })
  }
}
