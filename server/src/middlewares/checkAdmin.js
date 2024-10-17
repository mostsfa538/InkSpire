const checkAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
};

module.exports = checkAdmin;