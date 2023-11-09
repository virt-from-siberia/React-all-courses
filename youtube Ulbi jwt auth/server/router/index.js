const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  userController.registration,
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 })
);
router.post("/users/sign_in", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/auth/refresh", userController.refreshToken);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
