const router = require('express').Router();

const {
  findUsers,
  findUserById,
  getUser,
  editUser,
  editAvatar,

} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', findUserById);
router.get('/me', getUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
