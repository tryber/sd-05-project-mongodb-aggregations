// Referências:
// https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
// https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/#exp._S_toInt

db.trips.aggregate([
  {
    $match: {
      $and: [{ birthYear: { $exists: 1 } }, { birthYear: { $ne: "" } }],
    },
  },
  {
    $addFields: {
      birthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
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
