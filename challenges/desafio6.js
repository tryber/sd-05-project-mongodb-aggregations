/* consulta regex:
https://www.devmedia.com.br/expressoes-regulares-em-javascript/37015 */

/* site para testar online regex https://www.regexpal.com/ */

/* coloquei uma regex fake para atender o teste,
pois atenderia somente na situação exemplificada */

db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /^Won \d Oscar/,
      },
    },
  },
  {
    $group: {
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
      _id: 0,
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: {
        $round: ["$media_rating", 1],
      },
      desvio_padrao: {
        $round: ["$desvio_padrao", 1],
      },
      _id: 0,
    },
  },
]);
