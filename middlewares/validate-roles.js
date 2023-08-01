const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to verify the role without validating the token first',
    });
  }

  const { role, name } = req.user;

  if (role.role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} not admin`,
    });
  }

  next();
};

module.exports = {
  isAdminRole,
};
