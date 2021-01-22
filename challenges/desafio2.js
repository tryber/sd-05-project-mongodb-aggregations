db.movies.aggregate([
  { $match:
    {
      languages: { $all: ["English", "Spanish"] },
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      $or: [{ rated: "PG" }, { rated: "G" }],
    },
  },
  { $project: {
    _id: 0,
    titulo: "$title",
    avaliado: "$rated",
    notaIMDB: "$imdb.rating",
    votosIMDB: "$imdb.votes",
    ano: "$year",
  } },
]);
