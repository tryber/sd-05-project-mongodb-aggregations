// Determine qual o dia da semana com maior número de viagens iniciadas.
// GROUP
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.
// SORT + LIMIT no final

// PROJECT
// O resultado da sua query deve ter o seguinte formato
// { "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }

db.trips.aggregate([
  {
    $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      // diaDaSemana: 1,
      // total: 1,
      // retorna { "total" : 357594 }
      diaDaSemana: "$_id",
      // total: 1,
      // retorna na ordem invertida ou seja { "total" : 357594, "diaDaSemana" : 5 }
      total: "$total",
      // retorna o certo ou seja { "diaDaSemana" : 5, "total" : 357594 }
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
