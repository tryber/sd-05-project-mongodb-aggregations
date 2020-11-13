db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 }
    }
  },
  {
    $addFields: {
      num_favs: {
        $let: {
          vars: {
            cast_favs: [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney"
            ]
          },
          in: {
            $cond: {
              if: { $eq: [{ $type: "$cast" }, "array"], },
              then: { $size: { $setIntersection: ["$cast", "$$cast_favs"] } },
              else: 0
            }
          }
        }
      }
    }
  },
  { $project: { _id: 0, title: 1 } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 }
]);
