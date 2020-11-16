db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
    },
  },
  {
    $project: {
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      avaliado: "$rated",
      titulo: "$title",
      _id: 0,
    },
  },
]);
