const router = require("express").Router();
let User = require("./userModel.js");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add/:id").post((req, res) => {
  // Yes, it's a valid ObjectId, proceed with `findById` call.

  User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { searchKey: req.body.searchKey } },
    { safe: true, upsert: true, useFindAndModify: false }
  )
    .then((user) => {
      user
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
