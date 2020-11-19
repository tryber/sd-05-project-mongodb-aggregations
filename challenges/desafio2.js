db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      "imdb.rating": { $gte: 7 },
      languages: { $all: ["English", "Spanish"] },
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
]);
