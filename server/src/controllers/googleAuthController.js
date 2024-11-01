const passport = require("../config/googleAuth");
const utils = require("../utils/utils");

class googelAuthController {
	static async getGoogleLogin(req, res) {
		return res.status(200).json({ message: "googleAuthConsentPage" });
	}

	static async redirectGoogle(req, res, next) {
		passport.authenticate("google", (err, user, info) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Authentication failed. Please try again." });
			if (!user)
				return res
					.status(401)
					.json({ error: "User not found or authentication denied." });
			req.logIn(user, (loginErr) => {
				if (loginErr)
					return res
						.status(500)
						.json({ error: "Login failed. Please try again." });

				req.session.user = user;

				return res.redirect(process.env.CLIENT_URL);
			});
		})(req, res, next);
	}
}
module.exports = googelAuthController;
