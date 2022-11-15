const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.fullName) {
    res.status(400).send({ message: "A name needs to be set" });
    return;
  }

  const student = {
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
  };

  Student.create(student)
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
  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong when trying to retrieve students, Please try again",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `Can not find a student with id: ${id}.` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `Something went wrong when trying to retrieve student with the id: ${id}`,
        });
    });
};


exports.update = (req, res) => { 
    const id = req.params.id;

    Student.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student's info was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
  };
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Student.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Student.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} students were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      });
  };
