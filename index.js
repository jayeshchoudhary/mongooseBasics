const express = require("express");
const app = express();
const PORT = 8001;
const { connectDb } = require("./connectDb");
const Movie = require("./movieSchema");

app.use(express.json());

connectDb();

// Create
app.post("/movie", async (req, res) => {
    const movieBody = req.body;

    const newMovie = new Movie(movieBody);

    try {
        await newMovie.save();
        res.status(200).json(newMovie);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: true, message: err.message });
    }
});

// Read
app.get("/movie", async (req, res) => {
    const allMovies = await Movie.find();

    res.status(200).json(allMovies);
});

app.get("/movie/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await Movie.findOne({ _id: movieId });

    res.status(200).json(movie);
});

// Update
app.put("/movie/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
        { _id: movieId },
        movieData,
        { new: true }
    );

    res.status(200).json(updatedMovie);
});

// Delete
app.delete("/movie/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const deleteMovie = await Movie.findOneAndDelete({ _id: movieId });

    res.status(200).json(deleteMovie);
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
