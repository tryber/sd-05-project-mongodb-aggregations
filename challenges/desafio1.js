db.movies.aggregate(
  [
    {
      $match: {"imdb.rating": {$gte: 7},
      genres: {$not: {$in: ["Crime", "Horror"] } },
      $or: [{rated: "PG"}, {rated: "G"} ],
      languages: {$all: ["English", "Spanish"] }
      }
    }
  ]
).pretty();
