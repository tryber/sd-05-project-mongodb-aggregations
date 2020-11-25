/*
Desafio 9
A partir da coleção trips, determine o menor e o maior ano de nascimento. Guarde essa informação, você precisará dela mais tarde.

Não considere documentos com valores vazios ("") ou em que o campo não existe!

Para este desafio utilize o operador $toInt para converter de string para valor inteiro.

O resultado da sua query deve ter o seguinte formato:

{ "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
*/

db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $addFields: { year: { $toInt: "$birthYear" } } },
  {
    $group: {
      _id: 0,
      maiorAnoNascimento: { $max: "$year" },
      menorAnoNascimento: { $min: "$year" }
    }
  },
  { $project: { _id: 0 } }
]);
