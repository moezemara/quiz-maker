const express = require("express")
const config = require('./configs/configs')
const adminRouter = require("./api/admin/admin.router")
const studentsRouter = require("./api/students/students.router")
//var cors = require('cors')

const app = express()

//app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.use(express.json())

app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.json({
      success: 0,
      message: "JSON ERROR"
    })
  }
  next(err)
})

app.use("/api/admin", adminRouter)
app.use("/api/students", studentsRouter)

app.all("/api", (req, res) => {
  res.json({
    success: 1,
    message: "Welcome"
  })
})

//var server = https.createServer(options, app)

app.listen(config.port, () => {
  console.log('\x1b[32m%s\x1b[0m', "server starting on port : " + config.port)
})