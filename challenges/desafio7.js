db.movies.aggregate(
  [
    { $match: { languages: { $all: ["English"] } } },
    { $unwind: "$cast" },
    { $group: { _id: "$cast", mediaIMDB: { $avg: "$imdb.rating" }, numeroFilmes: { $sum: 1 } } },
    { $sort: { numeroFilmes: -1, _id: -1 } },
    { $project: { mediaIMDB: { $round: ["$mediaIMDB", 1] }, numeroFilmes: 1 } },
  ],
);
