db.movies.aggregate(
  [
    {
      $match: {
        genres: { $nin: ["Crime", "Horror"] },
        languages: { $all: ["English", "Spanish"] },
        rated: { $in: ["PG", "G"] },
        "imdb.rating": { $gte: 7 },
      },
    },
    {
      $project: {
        _id: 0,
        titulo: "$title",
        notaIMDB: "$imdb.rating",
        avaliado: "$rated",
        votosIMDB: "$imdb.votes",
        ano: "$year",
      },
    },
    {
      $sort: { ano: -1, notaIMDB: -1, titulo: 1 },
    },
  ],
);
