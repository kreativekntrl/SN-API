const {
    Thoughts,
    User
} = require("../models");

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((Users) => res.json(Users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id and populated thought and friend data
    getOneUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: "No user with that ID"
                }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST a new user:
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: "No user with this id!"
                }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({
                _id: req.params.userId
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: "No user with that ID"
                }) :
                User.deleteMany({
                    _id: {
                        $in: user.thoughts
                    }
                })
            )
            .then(() => res.json({
                message: "user and thoughts deleted!"
            }))
            .catch((err) => res.status(500).json(err));
    },
}