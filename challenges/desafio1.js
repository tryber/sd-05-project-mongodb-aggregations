// {
// 	"_id" : ObjectId("573a1390f29313caabcd4135"),
// 	"title" : "Blacksmith Scene",
// 	"year" : 1893,
// 	"runtime" : 1,
// 	"released" : ISODate("1893-05-09T00:00:00Z"),
// 	"cast" : [
// 		"Charles Kayser",
// 		"John Ott"
// 	],
// 	"plot" : "Three men hammer on an anvil and pass a bottle of beer around.",
// 	"fullplot" : "A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.",
// 	"awards" : "1 win.",
// 	"lastupdated" : "2015-08-26 00:03:50.133000000",
// 	"type" : "movie",
// 	"directors" : [
// 		"William K.L. Dickson"
// 	],
// 	"imdb" : {
// 		"rating" : 6.2,
// 		"votes" : 1189,
// 		"id" : 5
// 	},
// 	"countries" : [
// 		"USA"
// 	],
// 	"rated" : "UNRATED",
// 	"genres" : [
// 		"Short"
// 	],
// 	"tomatoes" : {
// 		"viewer" : {
// 			"rating" : 3,
// 			"numReviews" : 184,
// 			"meter" : 32
// 		},
// 		"lastUpdated" : ISODate("2015-06-28T18:34:09Z")
// 	},
// 	"num_mflix_comments" : 1,
// 	"comments" : [
// 		{
// 			"name" : "Taylor Alvarez",
// 			"email" : "taylor_alvarez@fakegmail.com",
// 			"movie_id" : ObjectId("573a1390f29313caabcd4135"),
// 			"text" : "Non dignissimos quo vero facere. Nihil incidunt nemo aliquam rem magnam vero. Deleniti nemo quidem ipsam id.",
// 			"date" : ISODate("1970-03-27T17:15:30Z")
// 		}
// 	]
// }

// DESAFIO 1

// Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender aos seguintes critérios:

// imdb.rating deve ser ao menos 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilizando a coleção movies, faça um pipeline que retorne todos esses filmes.

// Sua query deve retornar 41 documentos.

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
// .itcount();
