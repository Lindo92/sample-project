const db = require("../models");
const Teacher = db.teachers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.fullName) {
    res.status(400).send({ message: "A name needs to be set" });
    return;
  }

  const teacher = {
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    salary: req.body.salary,
  };

  Teacher.create(teacher)
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
  const fullName = req.body.fullName;
  var condition = fullName ? { fullName: { [Op.like]: `%${fullName}` } } : null;
  Teacher.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong when trying to retrieve teachers, Please try again",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teacher.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `Can not find a teacher with id: ${id}.` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `Something went wrong when trying to retrieve teacher with the id: ${id}`,
        });
    });
};


exports.update = (req, res) => { 
    const id = req.params.id;

    Teacher.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Teacher's info was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Teacher with id=" + id
        });
      });
  };
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Teacher.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Teacher was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Teacher with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Teacher.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Teachers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all teatchers."
        });
      });
  };
