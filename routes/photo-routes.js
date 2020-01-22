const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const categoryRoutes = require("./category_routes");

router.get("/", PhotoController.index);

router.post("/", PhotoController.create);

router.get("/new", PhotoController.make);

router.delete("/:id", PhotoController.destroy);

router.patch("/:id", PhotoController.update);

router.put("/:id", PhotoController.update);

router.get("/:id", PhotoController.show);

router.get("/:id/edit", PhotoController.edit);

router.use("/:photoId/comments", categoryRoutes);

module.exports = router;