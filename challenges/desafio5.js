// Ajuda do Felipe que tirou inspiração no Dandrea
db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      matchingActors: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ], "$cast",
        ],
      },
    },
  },
  { $match: { matchingActors: { $ne: null } } },
  { $addFields: { num_favs: { $size: "$matchingActors" } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1, _id: 0 } },
]);
