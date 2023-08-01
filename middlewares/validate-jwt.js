const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid).populate('role');

    //Verify if user exists
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user not found',
      });
    }

    //Verify State
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token - user state: false',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
