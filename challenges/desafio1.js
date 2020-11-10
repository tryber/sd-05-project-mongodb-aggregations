db.movies.aggregate({
  $match: {
    genres: { $nin: ["Crime", "Horror"] },
    rated: { $in: ["PG", "G"] },
    "imdb.rating": { $gte: 7 },
    languages: { $all: ["English", "Spanish"] },
  },
});
