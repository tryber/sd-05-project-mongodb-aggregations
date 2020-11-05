db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $gt: 0,
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: {
          $toInt: "$birthYear",
        },
      },
      menorAnoNascimento: {
        $min: {
          $toInt: "$birthYear",
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
