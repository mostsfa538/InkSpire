const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const bcrypt = require("bcrypt")

class loginContoller {
    static async getLogin(req, res) {
        if (req.session.isAuthenticated) {
            return res.status(200).json({"message": "user already authenticated, logout first"})
        }
        return res.render('login')
    }
    static async postLogin (req, res) {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({"message": "both email and password are required"})
        }
        console.log(email, password)
        try {
            const user = await prisma.user.findFirst({
                where: { email },
                select: { id: true, email: true, password: true },
                // Select only necessary fields
            })
            console.log(user)
            if (!user) {
                return res.status(404).send({"message": "no user found"})
            }
            bcrypt.compare(password, user.password).then(Valid => {
                if (!Valid) {
                    console.log("not valid")
                    return res.status(401).json({"message": "wrong email or password"})
                }
                req.session.user = { id: user.id, email: user.email };;
                req.session.isAuthenticated = true
                console.log(req.session)
                res.status(200).send(
                    `<form action="/logout" method="POST">
                        <button type="submit">logout</button>
                    </form>
                    `
                )
                // return res.status(200).json({"message": "loggedIn successfully"})
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({"message": "server error"})
        }
    }
    static async logout(req, res) {
        if (!req.session.isAuthenticated && !req.session.user) {
            return res.status(401).json({"message": "no established session to logout"})
        }
        try{
            await req.session.destroy()
            res.clearCookie('sessionCookie')
            console.log(req.session)
            res.status(200).json({"message": 'logged out successfully'})
        } catch(error){
            console.error(error)
            return res.status(500).json({"message": "logout failed"})
        }
    }
}


module.exports = loginContoller