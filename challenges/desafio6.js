db.movies.aggregate([
  {
    $match: {
      awards: { $exists: true },
    },
  },
  {
    $match: {
      awards: { $regex: /oscar/i},
      awards: { $regex: /won/i},
    }
  },
  {
    $group: {
      _id: null,
      "maior_rating": { $max: "$imdb.rating" },
      "menor_rating": { $min: "$imdb.rating" },
      "Rmedia_rating": { $avg: "$imdb.rating" },
      "Rdesvio_padrao": { $stdDevSamp: "$imdb.rating" },
    }
  },
  {
    $project:
    {
      _id: 0,
      "maior_rating": 1,
      "menor_rating": 1,
      "media_rating": { $round: ["$Rmedia_rating", 1] },
      "desvio_padrao": { $round: ["$Rdesvio_padrao", 1] }, 
    }
  }
]);
