const { v4 } = require('uuid')

module.exports = {
    generate: (initial) => {
        code = v4()
        return initial+v4().substring(8,18)
    }
}