const { request, response } = require('express');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find().populate('role');

    const total = await User.count();

    return res.status(200).json({
      total,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error getting users',
    });
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('role');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error getting user',
    });
  }
};

module.exports = {
  getUsers,
  getUser,
};
