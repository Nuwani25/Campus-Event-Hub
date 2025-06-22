// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

const checkCreator = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.creator.equals(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
