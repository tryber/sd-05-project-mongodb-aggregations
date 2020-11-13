// MATCH
// Considere somente os membros do elenco de filmes com o idioma inglês (English)

// UNWIND
// Traga o nome do ator ou atriz
// (Para quebrar o array de cast e poder fazer os proximos estagios por nome de ator/atriz)
// Sintaxe: db.collection.aggregate([{ $unwind : "$campo" }]);

// GROUP
// ..., número de filmes em que participou
// e a média do imdb desses filmes arredondada para uma casa decimal usando o operador $round.

// SORT
// Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

// PROJECT
// Cada documento no resultado deve ter o seguinte formato:
// { "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }

// Sua query deve retornar 47055 documentos - verificar com ITCOUNT()

db.movies.aggregate([
  {
    $match: { languages: { $eq: "English" } },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
]);
