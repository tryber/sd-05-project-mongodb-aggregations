db.movies.aggregate([
  {
    $match: { languages: { $eq: "English" } }, // retorna os elementos que contenha igualdade(eq)
  },
  { $unwind: "$cast" },
  {
    $group: { // agrupando os documentos distintos
      _id: "$cast",
      numeroFilmes: { $sum: 1 }, // retorna a soma dos valores
      mediaIMDB: { $avg: "$imdb.rating" }, // retorna a media dos valore
    },
  },
  {
    $project: { // passa os campos solicitados para o pipeline
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: { // ordena descrescente
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
