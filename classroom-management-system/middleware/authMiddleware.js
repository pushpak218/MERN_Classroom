const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('token: ' + token);
      console.log('process.env.JWT_SECRET: ' + config.JWT_SECRET);

      const decoded = jwt.verify(token, config.JWT_SECRET);
      console.log('decoded: ', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      console.log('req.user: ', req.user);

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Principal') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a principal' });
  }
};

module.exports = { protect, admin };
