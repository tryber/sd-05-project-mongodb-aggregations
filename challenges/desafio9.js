db.trips.aggregate([
  {
    $match: { birthYear: { $ne: "" } },
  },
  {
    $addFields: {
      numberYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$numberYear" },
      menorAnoNascimento: { $min: "$numberYear" },
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
