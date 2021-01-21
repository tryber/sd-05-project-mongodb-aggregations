db.trips.aggregate([
  { $match: { year: { $exists: 1, $ne: "" } } },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: { $max: { $toInt: "$year" } },
      menorAnoNascimento: { $min: { $toInt: "$year" } },
    },
  },
  { $project: { _id: 0 } },
]);
