db.movies.aggregate([
  {
    $match: {
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);
