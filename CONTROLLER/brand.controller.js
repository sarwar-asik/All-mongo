const { createBrandService, getBrandService } = require("./brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    console.log("hit createBrand");
    const result = await createBrandService(req.body);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Successfully created Brand",
      });
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
    console.log({ name, message, stack,error:"Error from createBrand "});
  }
};

exports.getBrand = async (req, res, next) => {
  try {
    console.log("hit getBrand");
    const result = await getBrandService(req.body);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Successfully get Brand",
        data: result,
      });
    }
  } catch (error) {
    const { name, stack, message } = error;
    res.status(400).json({
      status: "fail",
      error: "Could not get the brand",
      name,
      stack,
      message,
    });
    console.log({ name, message, stack,error:"Error from getBrand "});
  }
};
