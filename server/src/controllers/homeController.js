class homeController {
    static async getHome(req, res) {
        if (req.session.isAuthenticated && req.session.user) {
            return res.status(200).json({"isAuthenticated": req.session.isAuthenticated})
        } else {
            return res.status(200).json({"page": "home page"})
        }
    }
}
module.exports = homeController