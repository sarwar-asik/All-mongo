const { createBrandService } = require("./brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
   if(result){
    res.status(200).json({
        status:"success",
        message:"Successfully created Brand"
    })
   }
  } catch (error) {
    const { name, stack, message } = error;
    res.status(400).json({
      status: "fail",
      error: "Could not create the brand",
      name,
      stack,
      message,
    });
  }
};
