const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/generate-jwt');

const User = require('../models/user');

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');

    //Verify user
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    //Verify state
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    //Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error logging user',
    });
  }
};

const register = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    //Encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error registering user',
    });
  }
};

module.exports = {
  login,
  register,
};
