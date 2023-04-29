const { default: BrandMOdel } = require("../MODEL/Brand")

exports.createBrandService = async(data)=>{
    const result = await BrandMOdel.create(data);
    return result

}