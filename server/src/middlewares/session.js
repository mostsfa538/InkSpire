const session = require("express-session")
require('dotenv').config()
module.exports = session({
    secret: process.env.SESSION_SECRET || 'your-default-secret',
    name: "sessionCookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // one day
    }
})
