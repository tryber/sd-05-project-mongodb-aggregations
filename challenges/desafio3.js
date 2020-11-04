db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: false,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
