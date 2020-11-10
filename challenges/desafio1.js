db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      $or: [{ rated: "G" }, { rated: "PG" }],
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
