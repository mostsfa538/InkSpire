const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const bcrypt = require("bcrypt")

class singupController {

    static async getSignup(req, res) {
        return res.status(200).json({"page": "signUp page"})
    }

    static async postSignup(req, res) {
        const {email, password} = req.body
        try {
            const newUser = {
                email: email,
                password: await new Promise((resolve, reject) => {
                    bcrypt.hash(password, 10, (err, hashed) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(hashed)
                    })
                })
            }
            await prisma.user.create({
                data: newUser
            }).then(user => {
                req.session.user = { id: user.id, email: user.email };
                return res.status(200).json({"message": "signedUp successfully"})
            })
        } catch(error){
            console.log(error)
            return res.status(401).json({"message": `signup failed, user already have an account`})
        }
    } 
}

module.exports = singupController