db.movies.aggregate([
  // Seleciono(aggregates) os movies
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } }, // comparando os rating em imdb maiores ou igual ($gte) a 7
        { genres: { $nin: ["Crime", "Horror"] } }, // Não incluindo ($nin) os generos Crime e Horror
        { languages: { $all: ["English", "Spanish"] } }, // Selecionando todas ($all) com linguagem em Esp e Ing
        { rated: { $in: ["PG", "G"] } }, // Incluindo ($in) as classificações
      ],
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title", // Modifica $title para titulo
      notaIMDB: "$imdb.rating", // Modifica $imdb.rating para notaIMDB
      avaliado: "$rated", // Modifica $rated para avaliado
      ano: "$year", // Modifica $year para ano
      votosIMDB: "$imdb.votes", // Modifica $imdb.votes para votosIMDB
    },
  },
]);
