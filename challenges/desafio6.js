db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $regex: /^Won$/ }
    }
  },
  {
    $project: { title: 1 }
  }
]);
