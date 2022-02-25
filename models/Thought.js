const {
    Schema,
    model
} = require("mongoose");

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
        default: "Empty text",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: "Reaction"
    }],
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;