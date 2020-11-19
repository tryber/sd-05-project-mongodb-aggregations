db.movies.aggregate([
  {
    $match: {
      genres: {
        $nin: ["Crime", "Horror"],
      },
      "imdb.rating": {
        $gte: 7,
      },
      rated: {
        $in: ["PG", "G"],
      },
      languages: {
        $all: ["English", "Spanish"],
      },
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
