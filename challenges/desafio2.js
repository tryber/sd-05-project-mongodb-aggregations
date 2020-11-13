// ##### Desafio 2

// {PROJECT}
// retorne apenas os campos `title`, `rated`, `imdb.rating`, `imdb.votes` e `year`,
// modificando seus nomes para `titulo`, `avaliado`,
// `notaIMDB`, `votosIMDB` e `ano`, respectivamente.

// O resultado da sua query deve ter o seguinte formato:

// ```javascript
// { "titulo" : "A Streetcar Named Desire", "avaliado" : "PG",
// "notaIMDB" : 8.1, "votosIMDB" : 72364, "ano" : 1951 }
// // Demais documentos
// ```
db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
    },
  },
  {
    $project: {
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      avaliado: "$rated",
      titulo: "$title",
      _id: 0,
    },
  },
]);
