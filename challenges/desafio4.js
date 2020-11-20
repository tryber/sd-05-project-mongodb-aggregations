// Referência: https://docs.mongodb.com/manual/reference/operator/query/expr/

db.movies.aggregate([
  { $match: {
    $expr: {
      $eq: [{ $size: { $split: ["$title", " "] } }, 1],
    },
  } },
  { $project: { title_split: ["$title"], _id: 0 } },
  { $sort: { title_split: 1 } },
]);
