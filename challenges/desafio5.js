db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      dreamCast: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    $addFields: {
      intersectioning: {$setIntersection: ["$cast", "$dreamCast"]}
    }
  },
  {
    $addFields: {
      num_favs: { $cond: { if: { $isArray: "$intersectioning" }, then: { $size: "$intersectioning" }, else: "NA"} },
    },
  },
  {
    $match: {
      num_favs: { $ne: "NA" },
    },
  },
  {
    $sort: {num_favs: -1, "tomatoes.viewer.rating": -1, title: -1}
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {_id: 0, title: 1 }
  }
]);
