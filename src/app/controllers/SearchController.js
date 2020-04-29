const Message = require('../models/Message');
const User = require('../models/User');
const Yup = require('yup');
const datefns = require('date-fns');

class SearchController {
  async index(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Invalid validation' });
    }

    let user = {};
    let data = {};

    if (req.query.username) {
      user = await User.findOne({ username: req.query.username });

      if (!user) {
        return res.status(400).json({ error: "User doesn't exists" });
      }

      data = {
        user: user._id,
      };
    }

    if (req.query.date) {
      data = {
        ...data,
        createdAt: req.query.date,
      };
    }

    const result = await Message.find(data);

    return res.send(result);
  }
}

module.exports = new SearchController();
