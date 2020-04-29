const jwt = require('jsonwebtoken');
const Yup = require('yup');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');
const Admin = require('../models/Admin');

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Admin not found.' });
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const { _id } = admin;
    const token = jwt.sign({ id: _id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      admin: {
        _id,
        username,
      },
      token,
    });
  }
}

module.exports = new SessionController();
