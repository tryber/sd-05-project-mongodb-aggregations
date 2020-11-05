//  https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/index.html
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^won/i },
    },
  },
  {
    $match: {
      $or: [
        {
          awards: { $regex: /oscar/i },
        },
        {
          awards: { $regex: /oscars/i },
        },
      ],
    },
  },
  {
    $group: {
      _id: "imdb.rating",
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: false,
      maior_rating: true,
      menor_rating: true,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
