// imdb.rating deve ser ao menos 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilizando a coleção movies, faça um pipeline que retorne todos esses filmes.

db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
