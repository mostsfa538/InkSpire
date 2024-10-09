const checkSession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
};

module.exports = checkSession