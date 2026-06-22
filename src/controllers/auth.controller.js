const signToken = require('../services/jwt.service').signToken;

function login(req, res) {
    const { id, username, email } = req.body;
    const token = signToken({ id, username, email });
    res.json({ token });
}

module.exports = {
    login
};