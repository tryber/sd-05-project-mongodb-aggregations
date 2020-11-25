db.movies.aggregate([
  // Seleciono(aggregates) os movies
  {
    $match: { // retorna os que contenha os elementos especificados
      "imdb.rating": { $gte: 7 }, // comparando os rating em imdb maiores ou igual ($gte) a 7
      genres: { $nin: ["Crime", "Horror"] }, // Não incluindo ($nin) os generos Crime e Horror
      rated: { $in: ["PG", "G"] }, // Incluindo ($in) as classificações
      languages: { $all: ["English", "Spanish"] }, // Selecionando todas ($all) com linguagem em Esp e Ing
    },
  },
]);
