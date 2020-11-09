const favs = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "Gerge Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favs },
    },
  },
  {
    $addFields: {
      favoritos: {
        $setIntersection: [favs, "$cast"],
      },
    },
  },
  {
    $match: {
      favoritos: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$favoritos" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: true,
      _id: false,
    },
  },
]);
