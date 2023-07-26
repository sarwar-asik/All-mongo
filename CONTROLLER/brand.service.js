const BrandMOdel = require("../MODEL/Brand")
exports.createBrandService = async (data) => {
  console.log(data, "from createBrand services");

//   const result = await BrandMOdel.create(data)
  const result = await BrandMOdel.create(data)
  return result;
}

exports.getBrandService = async (data) => {
  console.log("from getBrand Service");
  const brands = await BrandMOdel.find({}).select("-products -suppliers");
  return brands;
};
