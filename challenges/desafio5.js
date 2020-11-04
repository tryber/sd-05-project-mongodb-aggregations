// /https://stackoverflow.com/questions/17039018/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findone

//  https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
db.movies.aggregate([
  {
    $match: {
      countries: {
        $in: ["USA"],
      },
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
    },
  },
  {
    $addFields: {
      intersected: {
        $setIntersection: [
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
          "$cast",
        ],
      },
    },
  },
  {
    $match: {
      intersected: {
        $ne: null,
      },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: "$intersected",
      },
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
