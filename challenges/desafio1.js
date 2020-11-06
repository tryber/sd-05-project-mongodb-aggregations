// Filmes em potencial devem atender aos seguintes critérios:

// imdb.rating deve ser ao menos 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilizando a coleção movies, faça um pipeline que retorne todos esses filmes.

// Sua query deve retornar 41 documentos.

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
// .itcount();

// [Honestidade acadêmica]
// Para a realização do projeto a seguir, dois PRs foram pontualmente consultados:
// Paulo Dandrea - https://github.com/tryber/sd-05-project-mongodb-aggregations/pull/1/files
// Felipe Vieira - https://github.com/tryber/sd-05-project-mongodb-aggregations/pull/12/files
