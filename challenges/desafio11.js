/* DESAFIO 11
Determine qual o dia da semana com maior número de viagens iniciadas.
Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.

O resultado da sua query deve ter o seguinte formato:
    { "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }
*/

db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);

/* LIÇÕES
- operador $dayOfWeek: retorna o dia da semana para uma certa data,
- sendo que os dias são representados em números de 1 (domingo) a 7 (sábado);
https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/
- $sort de forma decrescente (valor: -1);
*/

/* RESULTADO
{ "diaDaSemana" : 5, "total" : 357594 }
*/
