const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const bcrypt = require("bcrypt")

class loginContoller {
    static async getLogin(req, res) {
        res.status(200).json({"page": "login page"})
    }
    static async postLogin (req, res) {
        const {email, password} = req.body
        try {
            const user = await prisma.user.findFirst({
                where: { email },
                select: { id: true, email: true, password: true },
                // Select only necessary fields
            })
            if (!user) {
                return res.status(404).send({"message": "no user found"})
            }
            bcrypt.compare(password, user.password).then(Valid => {
                if (!Valid) {
                    return res.status(401).json({"message": "wrong email or password"})
                }
                req.session.user = { id: user.id, email: user.email };;
                req.session.isAuthenticated = true
                return res.status(200).json({"message": "loggedIn successfully"})
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({"message": "server error"})
        }
    }
    static async logout(req, res) {
        try{
            await req.session.destroy()
            res.clearCookie('sessionCookie')
            res.status(200).json({"message": 'logged out successfully'})
        } catch(error){
            console.error(error)
            return res.status(500).json({"message": "logout failed"})
        }
    }
}


module.exports = loginContoller