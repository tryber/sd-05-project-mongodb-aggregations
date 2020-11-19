// Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o maior valor,
// menor valor, média e o desvio padrão das avaliações (campo imdb.rating).
// Para a média e o desvio padrão arredonde os valores para uma casa decimal utilizando o $round.
// Dica: usar $regex

// Neste caso usar os operadores $min, $max,$avg, $stdDevSamp (desvio padrão)
// Pra média e desvio arredondar usando o $round
// Honestidade acadêmica regex: Aprendi com o Kyle
// \d para identificar dígitos, e o + para verificar a ocorrência dele uma ou mais vezes ( \d+)
// \d para identificar dígitos, e o + para verificar a ocorrência dele uma ou mais vezes ( \d+)

db.movies.aggregate([
  {
    $match: { awards: { $regex: /Won \d+ Oscars?/ } },
  },
  {
    $group: {
      _id: 0,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
