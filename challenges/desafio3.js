db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      $or: [{ rated: "PG" }, { rated: "G" }],
      languages: { $all: ["Spanish", "English"] },
    },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      _id: 0,
    },
  },
  { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } },
]);
