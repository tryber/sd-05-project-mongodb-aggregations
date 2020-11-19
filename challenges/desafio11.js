// Determine qual o dia da semana com MAIOR número de viagens iniciadas. Usar SORT e Limit
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.
// O resultado da sua query deve ter o seguinte formato:
// { "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }

db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
  },
  {
    // Agrupando pelo campo criado o total de viagens
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  {
    // Impressão das infos na ordem solicitada
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  { $limit: 1 },
]);
