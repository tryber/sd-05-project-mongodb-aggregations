// Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são seus
// atores ou atrizes preferidos. Aqui está o resultado:
// Sandra Bullock, Tom Hanks, Julia Roberts, Kevin Spacey, George Clooney
// Para filmes lançados nos Estados Unidos (campo countries), com tomatoes.viewer.rating
// maior ou igual a 3, crie um novo campo chamado num_favs, que represente quantos atores
//  ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
// Por fim, utilizando o mesmo pipeline, responda:
// Qual o título do vigésimo quinto filme do resultado dessa agregação?

// Criar uma variável pra armazenar os atores preferidos
// Selecionar filmes lançados nos EUA com tomatoes.viewer.rating >= 3 (Match)
// Criar campo num_favs com quantidade de atores favoritos - campo cast
// Sort num_favs, tomatoes.viewer.rating, title = -1
// 25 filme - skip e limit?

const topActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $set: {
      topActorsinCast: {
        $setIntersection: [topActors, "$cast"],
      },
    },
  },
  {
    $match: {
      topActorsinCast: { $ne: null },
    },
  },
  {
    $set: {
      num_favs: { $size: "$topActorsinCast" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
