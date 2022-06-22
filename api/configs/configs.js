module.exports = {
    port: 2097,
    database: {username: "root", password: "", database: "quiz"},
    jwt: {encryptkey: 'jwt-secret', expire: 60*60*24},
    recaptcha: {secretkey : "recaptcha-secret", bypass: 'quizbypass'}
}