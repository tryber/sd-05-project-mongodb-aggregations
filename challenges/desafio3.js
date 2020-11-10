// retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e o título por ordem
// alfabética (nesta ordem de desempate).

db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
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
  {
    $sort: { ano: -1, notaIMDB: -1, titulo: 1 },
  },
]);
