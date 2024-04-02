const User = require("../models/userSchema");

/////****** bleow are users CRUD API logic *******/

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findAll({});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.query.id },
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.query.id,
      },
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("deletedUser", deletedUser);
    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { createUser, getUser, deleteUser, updateUser };
