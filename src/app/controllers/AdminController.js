const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const Yup = require('yup');

class AdminController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username, password } = req.body;

    const userExists = await Admin.findOne({ username });

    if (userExists) {
      return res.status(401).json({ error: 'Admin already exists ' });
    }
    const password_hash = await bcrypt.hash(password, 8);

    const admin = await Admin.create({
      username,
      password: password_hash,
    });

    return res.json({ id: _id, username });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username } = req.params;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: "Admin doesn't exists" });
    }

    return res.json(admin);
  }
}

module.exports = new AdminController();
