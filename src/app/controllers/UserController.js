const User = require('../models/User');
const Yup = require('yup');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(401).json({ error: 'User already exists ' });
    }

    const user = await User.create({
      username,
    });

    return res.json(user);
  }

  async index(req, res) {
    const users = await User.find({});

    return res.json(users);
  }
}

module.exports = new UserController();
