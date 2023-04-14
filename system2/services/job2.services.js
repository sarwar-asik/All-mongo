const job2 = require("../model/jobs");

exports.bulkDeleteJobByID = async (id) => {
  console.log(id, "ids from bulk");
  // return ids
  const result = await job2.deleteOne({ _id: id });
  // // const result = await job2.deleteMany({ id: ids });
  return result;
};
