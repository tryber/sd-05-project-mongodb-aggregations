// Queremos contar quantos filmes cada um dos atores e atrizes do elenco (MATCH)
// já participou e obter uma média (AVG) do campo imdb.rating para cada um desses atores e atrizes.
// Traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb (PROJECT)
// desses filmes arredondada para uma casa decimal usando o operador $round.
// Considere somente os membros do elenco de filmes com o idioma inglês (English).
// Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

// Importante: uso do unwind pra ter acesso ao nome da atriz/ator diretamente
// Sintaxe: db.collection.aggregate([{ $unwind : "$field" }]);

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
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
// .itcount(); Total de 47055 documentos identificados
