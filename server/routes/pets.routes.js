const { authenticate, authenticateAdmin } = require("../config/jwt.config");
const PetController = require("../controller/pets.controller");

module.exports = app => {
    app.get("/api/pets/", PetController.findAllPets);
    app.get("/api/pets/:id", PetController.findOnePet);
    app.get("/api/pets/:id/likes", authenticate, PetController.findOnePet);
    app.post("/api/pets/new", authenticate, PetController.insertNewPet);
    app.put("/api/pets/:id/edit", authenticate, PetController.editPet);
    app.put("/api/pets/:id/comment/new", authenticate, PetController.newComment);
    app.delete("/api/pets/:id/adopt", authenticateAdmin, PetController.adoptPet);
}