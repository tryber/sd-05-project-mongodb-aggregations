db.trips.aggregate([
  {
    $match: {
      // retorna os que contenha os elementos especificados
      startTime: {
        // iniciando em viagem para o dia 10/03/2016
        $gte: ISODate("2016-03-10T00:00:00Z"), // igual o maior (gte) para startTime
        $lte: ISODate("2016-03-11T00:00:00Z"), // menor igual (lte) para startTime
      },
    },
  },
  {
    $addFields: {
      // Gera documentos que contêm todos os campos existentes
      tempoVoo: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000], // subtrai (subtract) e retorna o tempo de voo
        // divide para para resultado em minutos
      },
    },
  },
  {
    $group: {
      // agrupa elementos distintos
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$tempoVoo" }, // media duração voo em minutos
    },
  },
  {
    $project: {
      // passa os campos solicitados para o pipeline
      _id: 0,
      // retornar o menor inteiro, maior ou igual ao valor especificado ($ceil)
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
