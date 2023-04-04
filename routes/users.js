const router = require('express').Router();

const {
  findUsers,
  getUser,
  getMyUser,
  editUser,
  editAvatar,

} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', getUser);
router.get('/me', getMyUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
