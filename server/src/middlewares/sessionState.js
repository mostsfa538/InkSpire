const checkSession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    if (req.session.user.id !== parseInt(req.params.user_id)) {
        return res.status(401).json({"message": "no match between current user and userId"})
    }
    next();
};

module.exports = checkSession