const express = require('express');
const {createUser, getUser, deleteUser, updateUser } = require('../controllers/user-controller');
const router = express.Router();

router.route('/user').post(createUser).get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;