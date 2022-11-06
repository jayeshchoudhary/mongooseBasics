const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (value && value.length < 2) {
                    return false;
                }

                return true;
            },
            message: "test",
        },
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating should be minimum 1"],
        max: [10, "Rating should be maximum 10"],
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    actor: String,
    revenue: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Movie", movieSchema);
