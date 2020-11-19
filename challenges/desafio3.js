// Agora que você tem os campos essenciais, retorne esses filmes ordenados por ano e nota IMDB
// de forma decrescente e o título por ordem alfabética (nesta ordem de desempate).

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      languages: { $all: ["English", "Spanish"] },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
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
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
