const {
    User,
    Thoughts
} = require('../models');

module.exports = {
    // GET to get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET to get a single thought by its _id
    getOneThought(req, res) {
        Thoughts.findOne({
                _id: req.params.thoughtsId
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({
                _id: req.params.thoughtsId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) =>
                !course ?
                res.status(404).json({
                    message: 'No thought with this id!'
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({
                _id: req.params.thoughtsId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'No thought with that ID'
                }) :
                Student.deleteMany({
                    _id: {
                        $in: thought.reactions
                    }
                })
            )
            .then(() => res.json({
                message: 'Thought and reactions deleted!'
            }))
            .catch((err) => res.status(500).json(err));
    },
}