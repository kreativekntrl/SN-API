const {
    Schema,
    model
} = require("mongoose");
const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
    },
    thoughts: [thoughtsSchema],
    friends: [userSchema],
}, {
    toJSON: {
        getters: true,
    },
});

const User = model('user', userSchema);

module.exports = User;