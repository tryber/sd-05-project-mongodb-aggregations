db.trips.aggregate([
  {
    $match: { birthYear: { $ne: "" } },
  },
  {
    $addFields: { ano: { $toInt: "$birthYear" } },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$ano" },
      menorAnoNascimento: { $min: "$ano" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
