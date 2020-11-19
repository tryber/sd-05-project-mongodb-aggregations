// A partir da coleção trips, determine o menor e o maior ano de nascimento.
// Utilize o operador $toInt para converter de string para valor inteiro.
// Guarde essa informação, você precisará dela mais tarde.

// Selecionar primeiro campos diferente de vazios ou nulo - Match
// Agrupar pelo campo birthYear indicando os campos desejados pra retornar
// o maior e menor ano de nascimento - Project pra trazer as infos abaixo:

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
