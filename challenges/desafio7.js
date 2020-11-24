db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  {
    $group: {
      numeroFilmes: { $sum: +1 },
      mediaIMDB: { $avg: "$imdb.rating" },
      _id: "$cast",
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
      _id: 1,
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
