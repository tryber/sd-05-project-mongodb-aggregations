db.trips.aggregate([
  {
    $addFields: {
      // Gera documentos que contêm todos os campos existentes
      tempoVoo: {
        // subtrai (subtract) e retorna o tempo de voo
        // divide por ms
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      // agrupa valores distintos
      _id: "$usertype",
      duracaoMedia: { $avg: "$tempoVoo" }, // media do tempo de voo
    },
  },
  {
    $project: {
      // passa os campos solicitados para o pipeline
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] }, // arredonda para duas casas decimais
    },
  },
  { $sort: { duracaoMedia: 1 } }, // ordena crescentemente
]);
