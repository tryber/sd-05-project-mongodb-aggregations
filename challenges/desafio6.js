// Referências:
// Regex retirada de https://github.com/tryber/sd-05-project-mongodb-aggregations/pull/12/files
// https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
// https://stackoverflow.com/questions/50088576/mongoerror-the-subtract-accumulator-is-a-unary-operator
// https://docs.mongodb.com/manual/reference/operator/aggregation/round/
// https://docs.mongodb.com/manual/reference/operator/aggregation/max/
// https://docs.mongodb.com/manual/reference/operator/aggregation/group/

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won (?:1(?:[0-9] Oscars| Oscar)|[2-9] Oscars)/ },
    },
  },
  {
    $group: {
      _id: null,
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
