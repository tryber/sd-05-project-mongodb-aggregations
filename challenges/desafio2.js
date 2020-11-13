db.movies.aggregate([
  // Seleciono(aggregates) os movies
  {
    $match: { // retorna os que contenha os elementos especificados
      $and: [
        { "imdb.rating": { $gte: 7 } }, // comparando os rating em imdb maiores ou igual ($gte) a 7
        { genres: { $nin: ["Crime", "Horror"] } }, // Não incluindo ($nin) os generos Crime e Horror
        { languages: { $all: ["English", "Spanish"] } }, // Selecionando todas ($all) com linguagem em Esp e Ing
        { rated: { $in: ["PG", "G"] } }, // Incluindo ($in) as classificações
      ],
    },
  },
  {
    $project: { // passa os campos solicitados para o pipeline
      _id: 0,
      avaliado: "$rated", // Modifica $rated para avaliado
      titulo: "$title", // Modifica $title para titulo
      votosIMDB: "$imdb.votes", // Modifica $imdb.votes para votosIMDB
      notaIMDB: "$imdb.rating", // Modifica $imdb.rating para notaIMDB
      ano: "$year", // Modifica $year para ano
    },
  },
]);
