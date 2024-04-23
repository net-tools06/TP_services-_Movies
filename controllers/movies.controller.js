const db = require("../models");
const Movie = db.movies;

// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Movie
  const movie = new Movie({
    id: req.body.id,
    title: req.body.title,
    release: req.body.release ? req.body.release : false,
  });

  // Save Movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie.",
      });
    });
};

// Retrieve all Movie from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  let condition = id
    ? { id: { $regex: new RegExp(id), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies.",
      });
    });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
        });
      } else {
        res.send({
          message: "Movie was deleted successfully!",
        });
      }
    })
.catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id,
      });
    });
};

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Movies.",
      });
    });
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};

// Find all registered Movie
exports.findAllRegistered = (req, res) => {
  Movie.find({ registered: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies.",
      });
    });
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Student with id=${id}. Maybe Movie was not found!`,
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id,
      });
    });
};

