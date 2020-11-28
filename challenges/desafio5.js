// falta> crie um novo campo chamado num_favs, que represente quantos
// atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast)
// do filme. Por fim, utilizando o mesmo pipeline, responda: Qual o título do vigésimo
// quinto filme do resultado dessa agregação?

db.movies.aggregate(
  [
    {
      $match: {
        cast: {
          $in: [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney"
          ]
        },
        countries: { $eq: ["USA"] },
        "tomatoes.viewer.rating": { $gte: 3 }
      }
    },
    {
      $project: {
        _id: 0,
        title: 1
      }
    },
    {
      $sort: { num_favs: -1, "tomatoes.viwer.rating": -1, title: -1 }
    }
  ]
).pretty();
