db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { $or: [{ genres: "Crime" }, { genres: "Horror" }] },
        { $or: [{ rated: "PG" }, { rated: "G" }] },
        { $and: [{ languages: "English" }, { languages: "Spanish" }] },
      ],
    },
  },
]);
