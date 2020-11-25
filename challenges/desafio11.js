db.trips.aggregate([
  {
    $match: { startTime: { $ne: "" } }, //  seleciona os valores de startTime que não são vazio
  },
  {
    $addFields: {
      // Gera documentos que contêm todos os campos existentes
      diaDaSemana: { $dayOfWeek: "$startTime" }, // (dayOfWeek) extrair o dia da semana como numero
    },
  },
  {
    $group: {
      // agrupa o valores distintos
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } }, // ordena em ordem descrescente por está invertido
  { $limit: 1 }, // limita a um resultado
  {
    $project: {
      // passa os campos solicitados para o pipeline
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);
