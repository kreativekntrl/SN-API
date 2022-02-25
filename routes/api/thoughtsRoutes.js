const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/user
router.route('/')
.get(getUsers)
.get(getOneUser)
.post(createUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router
  .route('/:UserId')

module.exports = router;
