// https://docs.mongodb.com/manual/reference/operator/aggregation/split/
db.movies.aggregate([
  {
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: false,
      title_split: true,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
