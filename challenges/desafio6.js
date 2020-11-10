db.movies.aggregate([
  {
    $match: {
      awards: {
        $all: [/^won/i, /oscar*/i],
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating_t: { $avg: "$imdb.rating" },
      desvio_padrao_t: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $set: {
      media_rating: { $round: ["$media_rating_t", 1] },
      desvio_padrao: { $round: ["$desvio_padrao_t", 1] },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: 1,
      desvio_padrao: 1,
    },
  },
]);
