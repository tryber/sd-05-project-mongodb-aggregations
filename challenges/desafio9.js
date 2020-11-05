db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: " " },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birtYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birtYear" } },
    },
  },
  {
    $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 },
  },
]);
