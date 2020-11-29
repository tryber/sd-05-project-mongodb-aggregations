db.movies.aggregate(
  [
    {
      $match: { "imdb.rating": { $gte: 7 },
        genres: { $nin: ["Crime", "Horror"] },
        languages: { $all: ["English", "Spanish"] },
        $or: [{ rated: "PG" }, { rated: "G" }],
      },
    },
    {
      $project:
        {
          titulo: "$title",
          avaliado: "$rated",
          notaIMDB: "$imdb.rating",
          votosIMDB: "$imdb.votes",
          ano: "$year",
          _id: 0,
        },
    },
  ],
);
