/* DESAFIO 9
A partir da coleção trips, determine o menor e o maior ano de nascimento. Guarde essa informação,
você precisará dela mais tarde. Não considere documentos com valores vazios ("") ou em que o
campo não existe! Para este desafio utilize o $toInt para converter de string para valor inteiro.

O resultado da sua query deve ter o seguinte formato:
    { "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
*/

db.trips.aggregate([
  {
    $match: {
      birthYear: { $nin: ["", null] },
    },
  },
  {
    $group: {
      _id: null,
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
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);

/* LIÇÕES
- combinação do $match com $nin para descartar os resultados indesejados;
- removendo que vêm como padrão no $group não funciona se trocar o null por false;
- operador $toInt sugerido no enunciado:
https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
*/
