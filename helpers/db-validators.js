const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role) => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} is not registered in the DB`);
  }
};

const existEmail = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} is already registered`);
  }
};

const existUserById = async (id) => {
  const existUserById = await User.findById(id);
  if (!existUserById) {
    throw new Error(`The user with id ${id} does not exist`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
};
