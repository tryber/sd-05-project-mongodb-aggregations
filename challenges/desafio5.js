db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      auxCast: {
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
  { $match: { auxCast: { $ne: null } } },
  { $addFields: { num_favs: { $size: "$auxCast" } } },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
