const { User } = require('../../models');
const { helpers } = require('../../utilities/index');

const userAuthorization = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const data = await helpers.encryption.jwtVerfy(token);

        if (!data) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const userData = await User.findById(data.user); // <-- التعديل هنا
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = userData;
        next();
    } catch (err) {
        console.error("Authorization error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    userAuthorization,
};
