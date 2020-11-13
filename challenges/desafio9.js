db.trips.aggregate([
  {
    $match: { birthYear: { $nin: ["", null] } },
    // não retorna os elementos que os valores sejam vazio ("") ou null
  },
  {
    $group: {
      // agrupa os elementos distintos
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } }, // maximo valor inteiro
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } }, // minimo valor inteiro
    },
  },
  {
    $project: {
      // passa os campos solicitados para o pipeline
      _id: 0,
    },
  },
]);
