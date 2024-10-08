function sessionState(req, res, next) {
    if (req.session.user) {
        if (req.url === "/" || req.url === "/login" || req.url === "/signup")
            return res.status(200).json({"message": "already isAuthenticated"})
    } else {
        if (req.url === "/logout"){
            return res.status(401).json({
                "message": "no established session to logout"})
        }
    }
    next()
}

module.exports = sessionState