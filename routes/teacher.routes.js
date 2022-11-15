const express = require("express");
const router = express.Router();
const teachers = require("../teachers/teacher.controller");


    router.post("/", teachers.create);
    router.get("/",teachers.findAll);
    router.get("/:id", teachers.findOne);
    router.put("/:id", teachers.update);
    router.delete("/:id", teachers.delete);
    router.delete("/", teachers.deleteAll);

module.exports = router;