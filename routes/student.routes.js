const express = require("express");
const router = express.Router();
const students  = require("../students/student.controller");


    router.post("/", students.create);
    router.get("/",students.findAll);
    router.get("/:id", students.findOne);
    router.put("/:id", students.update);
    router.delete("/:id", students.delete);
    router.delete("/", students.deleteAll);

module.exports = router;