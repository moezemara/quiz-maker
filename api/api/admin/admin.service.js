const pool = require("../../configs/database");

module.exports = {
  getuserbyusername: (data) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `select * from users where username = ?`,
        [data.username],
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
  getuserbykey: (key) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `select username from users where userkey = ?`,
        [key],
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
  updatecommand: (type, action) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE commands SET action = ? where command = ?`,
        [action, type],
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
  getspecializations: () => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `SELECT * FROM specializations`,
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
  insertspecialization: (specialization) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `INSERT INTO specializations (specialization) values (?)`,
        [specialization],
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
  deletespecialization: (specialization) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `DELETE FROM specializations WHERE specialization = ?`,
        [specialization],
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
  getstudents: () => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `SELECT * FROM students`,
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
  deletestudent: (student_uuid) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `DELETE FROM students WHERE student_uuid = ?`,
        [student_uuid],
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
  updatestudent: (student_uuid, type) => {
    const type_taken = `${type}_taken`
    const type_uuid = `${type}_uuid`
    const type_answers = `${type}_answers`
    const type_grade = `${type}_grade`
    const type_start = `${type}_start`
    const type_end = `${type}_end`

    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = 'no', ?? = ?, ?? = '[]', ?? = ?, ?? = ?, ?? = ? WHERE student_uuid = ?`,
        [
          type_taken,
          type_uuid,
          null,
          type_answers,
          type_grade,
          null,
          type_start,
          null,
          type_end,
          null,
          student_uuid
        ],
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
  updatestudentstime: (student_uuid, time, type) => {
    const type_end = `${type}_end`

    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE students SET ?? = ?? + ? WHERE student_uuid = ?`,
        [
          type_end,
          type_end,
          time,
          student_uuid
        ],
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
  getexams: () => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `SELECT * FROM exams`,
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
  insertexam: (name, uuid, time, specialization, type) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `INSERT INTO exams (name, uuid, time, specialization, type, questions) values (?, ?, ?, ?, ?, ?)`,
        [name, uuid, time, specialization, type, '[]'],
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
  deleteexam: (uuid) => {
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
  updateexamtime: (uuid, time) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE exams SET time = ? WHERE uuid = ?`,
        [
          time,
          uuid
        ],
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
  getexamquestions: (uuid) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `SELECT questions FROM exams WHERE uuid = ?`,
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
  updateexamquestions: (uuid, questions, size) => {
    return new Promise((resolve, reject) =>{
      pool.query(
        `UPDATE exams SET questions = ?, auto_incerment = auto_incerment + ? WHERE uuid = ?`,
        [
          questions,
          size,
          uuid
        ],
        (error, results, fields) => {
          if (error) {
            reject(error)
          }else{
            resolve(results)
          }
        }
      );
    })
  }
}
