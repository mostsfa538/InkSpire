const session = require("express-session")

module.exports = session({
    secret: process.env.SESSION_SECRET,
    name: "sessionCookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // one day
    }
})
