db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB_t: { $avg: "$imdb.rating" },
    },
  },
  { $set: { mediaIMDB: { $round: ["$mediaIMDB_t", 1] } } },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: 1,
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
