const router = require("express").Router();

const { findUsers, findUserById, createUser } = require("../controllers/users");

router.get("/", findUsers);
router.get("/:userId", findUserById);
router.post("/", createUser);

module.exports = router;
