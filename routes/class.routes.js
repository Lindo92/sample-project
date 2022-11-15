const express = require("express");
const router = express.Router();
const classes  = require("../classes/class.controller");


    router.post("/", classes.create);
    router.get("/",classes.findAll);
    router.get("/:id", classes.findOne);
    router.put("/:id", classes.update);
    router.delete("/:id", classes.delete);
    router.delete("/", classes.deleteAll);

module.exports = router;