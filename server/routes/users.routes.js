const { authenticate, authenticateAdmin } = require("../config/jwt.config");
const UserController = require("../controller/users.controller");

module.exports = app => {
    app.post("/api/user/new", UserController.insertNewUser);
    app.post("/api/user/login", UserController.logInUser);
    app.get("/api/user/logout", UserController.logOutUser);
    app.get("/api/user/check", authenticate, UserController.checkLogin);
    app.get("/api/user/admin/check", authenticateAdmin, UserController.checkAdminLogin);
    app.get("/api/user/pets", authenticate, UserController.getUserPets);
    app.get("/api/admin/approve", authenticateAdmin, UserController.getAdminPets);
}