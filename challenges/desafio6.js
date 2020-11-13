db.movies.aggregate([
  {
    $match: { // retorna awards que contenha o regex
      awards: { $regex: /Won \d+ Oscars?/ }, // regex identifica o digito e a ocorrencia dele
    },
  },
  {
    $group: { // Agrupa elementos distintos
      _id: 0,
      maior_rating: { $max: "$imdb.rating" }, // com maior valor
      menor_rating: { $min: "$imdb.rating" }, // com menor valor
      media_rating: { $avg: "$imdb.rating" }, // como a media de valores
      desvio_padrao: { $stdDevSamp: "$imdb.rating" }, // com desvio padrão da amostra dos valores
    },
  },
  {
    $project: { // passa os campos solicitados para o pipeline
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
