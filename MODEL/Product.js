const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Provide a Product name"],
      maxLength: [100, "Name is too longer"],
      unique: [true, "Name must be Unique"],
      minLength: [2, "Name must be 2 character."],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can not be {VALUE} . must be kg/litre/pcs/bag",
      },
    },
    imageURL: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          let isValid = true;
          value.forEach((url) => {
            if (!validator.isURL(url)) {
              isValid = false;
            }
          });
          return isValid;
        },
        message: "Please provide valid url",
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
