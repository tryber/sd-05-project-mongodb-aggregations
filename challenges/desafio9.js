db.trips.aggregate([
  { $match: { birthYear: { $not: { $eq: "" } } } },
  { $addFields: { birthYear: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
