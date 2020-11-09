db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"]}
    }
  }
  /*
  { $project: { _id: 0, "imdb.rating": 1, genres: 1, rated: 1, languages: 1 } },
  { $count: "documents" }
  */
]);
