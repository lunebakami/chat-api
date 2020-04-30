const Message = require('../models/Message');
const User = require('../models/User');
const Yup = require('yup');
const isSameDay = require('date-fns/isSameDay');
const parseISO = require('date-fns/parseISO');

class SearchController {
  async index(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Invalid validation' });
    }

    const messages = await Message.find().populate({
      path: 'user',
      select: 'username',
    });

    const searchedMessages = await messages.filter((message) => {
      if (req.query.username && req.query.date) {
        return (
          req.query.username === message.user.username &&
          isSameDay(message.createdAt, parseISO(req.query.date))
        );
      }
      if (req.query.username) {
        return req.query.username === message.user.username;
      }
      if (req.query.date) {
        return isSameDay(message.createdAt, parseISO(req.query.date));
      }
    });

    return res.json(searchedMessages);
  }
}

module.exports = new SearchController();
