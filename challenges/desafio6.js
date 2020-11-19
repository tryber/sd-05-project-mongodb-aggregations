/* DESAFIO 6
Vamos explorar mais operadores aritméticos!
Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o maior valor,
menor valor, média e o desvio padrão das avaliações (campo imdb.rating). Para a média e o desvio
padrão arredonde os valores para uma casa decimal utilizando o $round.

Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma sequência de string
parecida com essas abaixo, portanto $regex é um operador bem-vindo:
Won 10 Oscars
Won 1 Oscar

Utilize o $stdDevSamp para calcular o desvio padrão.
*/

db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /^Won \d+ oscar/i,
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: {
        $round: ["$media_rating", 1],
      },
      desvio_padrao: {
        $round: ["$desvio_padrao", 1],
      },
    },
  },
]);

/* LIÇÕES
- operador artimético sugerido no enunciado $stdDevSamp:
https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
- na utilização do $regex:
\d : ANY ONE digit/non-digit character. Digits are [0-9];
+  : one or more (1+), e.g., [0-9]+ matches one or more digits such as '123', '000'.
https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
- o operador $group organiza o que recebe de input e gera um output para ser projetado;
- nesse caso não precisa agrupar pelo id, mas como o id vem por padrão, foi define null;
https://docs.mongodb.com/manual/reference/operator/aggregation/group/
*/
