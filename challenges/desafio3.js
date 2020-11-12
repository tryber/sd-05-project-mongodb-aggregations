db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 }, // comparando os rating em imdb maiores ou igual ($gte) a 7
      genres: { $nin: ["Crime", "Horror"] }, // Não incluindo ($nin) os generos Crime e Horror
      $or: [
        // As classificações usa lógica de curto-circuito (or)
        { rated: "PG" },
        { rated: "G" },
      ],
      $and: [{ languages: "English" }, { languages: "Spanish" }],
    },
  },
  { $project: {
    _id: 0,
    titulo: "$title", // Modifica $title para titulo
    avaliado: "$rated", // Modifica $rated para avaliado
    notaIMDB: "$imdb.rating", // Modifica $imdb.rating para notaIMDB
    votosIMDB: "$imdb.votes", // Modifica $imdb.votes para votosIMDB
    ano: "$year", // Modifica $year para ano
  },
  },
  {
    $sort: {
      // Ordena e retorna o pipeline
      ano: -1,
      notaIMDB: -1,
      titulo: 1, // Para ano descrescente e notaIMDB(-1), titulo crescente(1)
    },
  },
]);
