db.movies.aggregate([
  {
    $match: {
      awards: {
        $in: [
          /Won 1 Oscar/,
          /Won 2 Oscars/,
          /Won 3 Oscars/,
          /Won 4 Oscars/,
          /Won 5 Oscars/,
          /Won 6 Oscars/,
          /Won 7 Oscars/,
          /Won 8 Oscars/,
          /Won 9 Oscars/,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media_rating: {
        $avg: "$imdb.rating",
      },
      desvio_padrao: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: {
        $round: ["$media_rating", 1],
      },
      desvio_padrao: {
        $round: ["$desvio_padrao", 1],
      },
    },
  },
]);
