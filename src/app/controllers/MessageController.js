const Message = require('../models/Message');
const User = require('../models/User');
const Yup = require('yup');

class MessageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      user: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { content, user } = req.body;

    const userExists = await User.findOne({ _id: user });

    if (!userExists) {
      return res.status(401).json({ error: "User doesn't exists!" });
    }

    const message = await Message.create({
      content,
      user,
    });

    return res.json({ message });
  }

  async index(req, res) {
    const messages = await Message.find().populate({
      path: 'user',
      select: 'username',
    });

    return res.json(messages);
  }
}

module.exports = new MessageController();
