const db = require("../models");
const Class = db.classes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "A name needs to be set" });
    return;
  }

  const Class = {
    title: req.body.title,
    weeks: req.body.weeks,
    startDate: req.body.startDate,
  };

  Class.create(Class)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Something went wrong. Please try again",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.body.title;
  var condition = title ? { title: { [Op.like]: `%${title}` } } : null;
  Class.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong when trying to retrieve Classes, Please try again",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Class.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `Can not find a Class with id: ${id}.` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `Something went wrong when trying to retrieve Class with the id: ${id}`,
        });
    });
};


exports.update = (req, res) => { 
    const id = req.params.id;

    Class.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Class's info was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update a Class with id=${id}. Maybe the Class was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Class with id=" + id
        });
      });
  };
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Class.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Class was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Class with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Class.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Classes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Classes."
        });
      });
  };
