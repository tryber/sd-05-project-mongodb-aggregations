db.movies.aggregate([
  {
    $match: { countries: "USA", "tomatoes.viewer.rating": { $gte: 3 } },
  },
  {
    $addFields: {
      atores: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
          "$cast",
        ],
      },
    },
  },
  {
    $match: {
      atores: { $ne: null },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$atores" },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { _id: 0, title: 1 } },
]);
