db.movies.aggregate([
  {
    $addFields: {
      // Gera documentos que contêm todos os campos existentes
      title_split: { $split: ["$title", " "] }, // Delimitador (" ") espaço para title afim de identificar nomes com duas palavras ou mais
    },
  },
  {
    $match: {
      // retorna os title_split que contenha uma string
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      // passa os campos solicitados para o pipeline
      _id: 0,
      title_split: 1,
    },
  },
  {
    $sort: {
      // ordena os title_split em ordem crescente
      title_split: 1,
    },
  },
]);
