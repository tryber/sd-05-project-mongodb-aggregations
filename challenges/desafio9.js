db.trips.aggregate([
  {
    $match: {
      birthYear: { $nin: [""] },
    },
  },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: {
        $max: { $toInt: "$birthYear" },
      },
      menorAnoNascimento: {
        $min: { $toInt: "$birthYear" },
      },
    },
  },
  {
    $project: {
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
      _id: 0,
    },
  },
]);
