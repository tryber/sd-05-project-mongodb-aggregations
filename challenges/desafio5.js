// Referências:
// https://docs.mongodb.com/manual/reference/operator/aggregation/limit/
// https://docs.mongodb.com/manual/reference/operator/aggregation/skip/
// https://docs.mongodb.com/manual/reference/operator/aggregation/size/
// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/index.html

db.movies.aggregate([
  {
    $match: {
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      "tomatoes.viewer.rating": 1,
      title: 1,
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
      },
    },
  },
  { $match: { num_favs: { $gt: 0 } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1 } },
]);
