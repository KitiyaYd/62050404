const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.get("/:id", userController.show);

module.exports = router;
