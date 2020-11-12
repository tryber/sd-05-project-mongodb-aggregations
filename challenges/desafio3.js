// ##### Desafio 3

// Agora que você tem os campos essenciais, retorne esses filmes ordenados por ano
// e nota IMDB de forma decrescente e o título por ordem alfabética (nesta ordem de desempate).

// O resultado da sua query deve ter o seguinte formato:

// ```javascript
// { "titulo" : "McFarland, USA", "avaliado" : "PG", "notaIMDB" : 7.5, "votosIMDB" : 14091, "ano" : 2015 }
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
