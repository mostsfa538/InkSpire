const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");

class loginContoller {
    static async getLogin(req, res) {
        const user = await utils.getUpdatedUser(req.session.user.id)
        res.status(200).json({ user: user })
    }
    static async postLogin (req, res) {
        const {email, password} = req.body
        try {
            const user = await prisma.user.findFirst({
                where: { email },
                include: {
                    carts: {include: {items: {include: {book: true}}}},
                    orders: true,
                    reviews: true,
                    OnHolds: true,
                    Favorites: true
                }
            })
            if (!user) {
                return res.status(404).send({"message": "no user found"})
            }
            bcrypt.compare(password, user.password).then(valid => {
                if (!valid) {
                    return res.status(401).json({"message": "wrong email or password"})
                }
                req.session.user = user;
                return res.status(200).json({
                    "message": "loggedIn successfully",
                    "user": {
                        ...user,
                        password: ""
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({"message": "server error"})
        }
    }
    static async logout(req, res) {
        try{
            await req.session.destroy()
            res.clearCookie('sessionCookie')
            res.status(200).json({"message": 'logged out successfully'})
        } catch(error){
            return res.status(500).json({"message": "logout failed"})
        }
    }
}

module.exports = loginContoller