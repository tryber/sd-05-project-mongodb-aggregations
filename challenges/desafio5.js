db.movies.aggregate([
  {
    $match: {
      // Filtra e passa os documentos que atende as condições
      cast: {
        // campo dos atores
        $in: [
          //  Seleciona os documentos nos quais o valor de um campo sejam igual
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
      },
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 }, // É maior ou igual a (>=) ao valor especificado
    },
  },
  {
    $addFields: {
      //  Gera documentos que contêm todos os campos existentes
      num_favs: {
        $size: {
          $setIntersection: [
            // intercessão das matriz afim de gerar outra
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
      },
    },
  }, // Ordena (num_favs/ tomatoes.viewer.rating/ title) descrescente
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } }, // passa os campo solicitados para o pipeline
  { $skip: 24 }, // ignorando os 24 primeiros resultados
  { $limit: 1 }, // limitando a um resultado que passa para o pipeline
]);
