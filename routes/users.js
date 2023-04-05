const router = require('express').Router();

const {
  userValidate,
  userSearchByIdValidate,
  avatarValidate,
} = require('../utils/validate');

const {
  findUsers,
  getUser,
  getMyUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', userSearchByIdValidate, getUser);
router.get('/me', getMyUser);
router.patch('/me', userValidate, editUser);
router.patch('/me/avatar', avatarValidate, editAvatar);

module.exports = router;
