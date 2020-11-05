// A partir da coleção trips, determine o menor e o maior ano de nascimento.
// Utilize o operador $toInt para converter de string para valor inteiro.
// Guarde essa informação, você precisará dela mais tarde.
// GROUP - campo birthYear

// MATCH
// Não considere documentos com valores vazios ("") ou em que o campo não existe!

// PROJECT
// O resultado da sua query deve ter o seguinte formato:
// { "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }

db.trips.aggregate([
  { $match: { birthYear: { $nin: ["", null] } } },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
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

// retorna { "maiorAnoNascimento" : 2000, "menorAnoNascimento" : 1885 }
