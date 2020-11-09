db.movies.aggregate([
  {$match:{
    $and:[
      {"imdb.rating": { $gte: 7 }},
      {"genres": {$nin:["Crime" ,"Horror"]}},
      {"rated": {$in:["PG", "G"]}},
      {"languages": {$all:["English", "Spanish"]}}
    ]
  }},
  { $group: { _id: null, myCount: { $sum: 1 } } }
]).pretty();
// HA Hugo Costa