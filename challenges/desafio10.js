db.trips.aggregate([{ $group: { _id: "$userType", } }]);
