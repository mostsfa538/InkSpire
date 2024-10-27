const passport = require("passport")
const GoogleStrategy = require("passport-google-oidc")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const utils = require('../utils/utils')

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    state: false,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/auth/google/redirect',
    scope: [ 'profile', 'email']
}, async function verify(issuer, profile, cb) {
    try {
        const user = await prisma.user.findFirst({
            where: {email: profile.emails[0].value}
        })
        if (!user) {
            const user = await prisma.user.create({
                data: {
                    email: profile.emails[0].value,
                    password: "googleAuth",
                    f_name: profile.name.given_name,
                    l_name: profile.name.familyName
                }
            })
            if (!user)
                return cb(new Error("can't create or retreive user"), null)
        }
        const updatedUser = await utils.getUpdatedUser(user.id)
        return cb(null, updatedUser);
    } catch(err) {
        return res.status(500).json({"message": "can't create or retrieve user"})
    }
}
))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, user);
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = passport