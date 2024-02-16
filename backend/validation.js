const zod = require('zod')

const UserSignupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


const UserSigninSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

module.exports = {UserSignupSchema, UserSigninSchema}